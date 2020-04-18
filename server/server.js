const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./serverConfig');
const api = require('./api');
const app = express();

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,
    message: 'You have exceeded the 50 requests per hour limit!',
    headers: true,
});

app.use(limiter);
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
