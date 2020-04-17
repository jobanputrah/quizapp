const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./serverConfig');
const api = require('./api');
const app = express();

app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, config.responseDelayMs || 0);
});
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api)

app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000/');
});
