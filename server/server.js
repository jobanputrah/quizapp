const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

app.use(bodyParser.json());
app.use((_, res, next) => {
    // TODO: make this a config
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/api', api)

app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000/');
});

