import axios from 'axios';

const ENDPOINT = require('./config').backendEndpoint;

export async function fetchQuiz(quizId) {
    const res = await axios.get(ENDPOINT + 'quiz/' + quizId);
    return res.data;
}
