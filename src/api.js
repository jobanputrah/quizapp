import axios from 'axios';

const ENDPOINT = require('./config').backendEndpoint;

export async function fetchQuiz(quizId) {
    try {
        const res = await axios.get(ENDPOINT + 'quiz/' + quizId);
        return {
            data: res.data
        };
    } catch (e) {
        const error = e.response ? e.response.status : 500;
        return { error };
    }
}

export async function verifyQuiz(quizId, answers) {
    try {
        const res = await axios.post(ENDPOINT + 'quiz/' + quizId + '/verify', answers);
        return {
            data: res.data
        };
    } catch (e) {
        const error = e.response ? e.response.status : 500;
        return { error };
    }
}