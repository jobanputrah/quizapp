const AWS = require('aws-sdk');
const serverConfig = require('../serverConfig');

AWS.config.update({
    region: serverConfig.awsRegion,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const TABLENAME = serverConfig.awsDynamoTableName || 'quizzes';

// quizzes can be cached as there is no provision to update or delete them
const CACHE = [];

function getQuiz(quizid, cb) {
    if (!typeof quizid === 'string' || !typeof cb === 'function')
        throw new Error('Invalid arguments');
    
    const cachedQuiz = CACHE.find(q => q.quizid === quizid);
    if (cachedQuiz) {
        cb(null, cachedQuiz);
        return;
    }
    
    const params = {
        TableName: TABLENAME,
        Key: {
            quizid
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error(err);
            cb(err);
        }

        const quiz = data.Item;

        if (quiz) {
            if (CACHE >= serverConfig.cacheSize) {
                CACHE = CACHE.slice((CACHE.length - serverConfig.cacheSize) + 1);
            }
            CACHE.push(quiz);
        }
        
        cb(null, quiz);
    });
}

function addQuiz(quiz, cb) {
    const params = {
        TableName: TABLENAME,
        Item: quiz
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error(err);
            cb(err);
        }

        console.log(data);
        const quiz = data.Item;

        if (quiz) {
            if (CACHE >= serverConfig.cacheSize) {
                CACHE = CACHE.slice((CACHE.length - serverConfig.cacheSize) + 1);
            }
            CACHE.push(quiz);
        }

        cb(null, quiz);
    });
}

module.exports = {
    getQuiz,
    addQuiz
};
