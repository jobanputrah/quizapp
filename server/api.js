const express = require('express');
const router = express.Router();

let id = 0;
const DB = {};

router.post('/quiz', (req, res) => {
    const body = req.body;
    
    body.id = id++;
    DB[body.id] = body;

    res.json(body);
});

router.get('/quiz/:id', (req, res) => {
    const id = req.params.id;

    const quiz = DB[id];

    if (!quiz) {
        res.status(404).json({ error: 'quiz not found' });
        return;
    }

    res.json(quiz);
});

router.post('/quiz/:id/verify', (req, res) => {
    const id = req.params.id;

    const quiz = DB[id];
    if (!quiz) {
        res.status(404).json({ error: 'quiz not found' });
        return;
    }

    const answers = req.body;
    if (!answers || !Array.isArray(answers) || answers.length !== quiz.questions.length) {
        res.status(400).json({ error: 'bad request' });
        return;
    }

    const result = quiz.questions.map((q, i) => q.answer === answers[i]);
    const score = result.reduce((a, r) => r ? a + 1 : a, 0);

    res.json({ score, result });
    
});

module.exports = router;

