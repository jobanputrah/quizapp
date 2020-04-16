import axios from 'axios';

const ENDPOINT = require('./config').backendEndpoint;

export async function fetchQuiz(quizId) {
    const res = await axios.get(ENDPOINT + 'quiz/' + quizId);
    return res.data;
}

export async function verifyQuiz(quizId, answers) {
    const res = await axios.post(ENDPOINT + 'quiz/' + quizId + '/verify', answers);
    return res.data;
}