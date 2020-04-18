const express = require('express');
const router = express.Router();
const quizDB = require('./data/quiz');

function stripAnswers(quiz) {
    return {
        ...quiz,
        questions: quiz.questions.map(q => ({
            ...q,
            answer: null,
        })),
    };
}

router.post('/quiz', (req, res) => {
    const body = req.body;
    
    // TODO: validate req body

    const newId = Math.random().toString(36).substring(2);
    body.quizid = newId;

    quizDB.addQuiz(body, function (err, quiz) {
        if (err || !quiz) {
            res.status(500).json({ error: 'Could not add quiz' });
            return;
        }

        res.json(quiz);
    });
});

router.get('/quiz/:id', (req, res) => {
    const id = req.params.id;

    quizDB.getQuiz(id, function (err, quiz) {
        if (err) {
            res.status(500).json({ error: 'Could not fetch quiz' });
            return;
        }

        if (!quiz) {
            res.status(404).json({ error: 'quiz not found' });
            return;
        }

        res.json(stripAnswers(quiz));
    });
});

router.post('/quiz/:id/verify', (req, res) => {
    const id = req.params.id;
    const answers = req.body;

    quizDB.getQuiz(id, function (err, quiz) {
        if (err) {
            res.status(500).json({ error: 'Could not fetch quiz' });
            return;
        }

        if (!quiz) {
            res.status(404).json({ error: 'quiz not found' });
            return;
        }

        if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
            res.status(400).json({ error: 'bad request' });
            return;
        }

        const result = quiz.questions.map((q, i) => q.answer === answers[i]);
        const score = result.reduce((a, r) => r ? a + 1 : a, 0);

        res.json({ score, result });
    });
});

module.exports = router;
