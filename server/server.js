require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const config = require('./serverConfig');
const api = require('./api');
const app = express();

const PORT = process.env.PORT || 8000;

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: config.requestLimitPerHr || 50,
    message: 'You have exceeded the 50 requests per hour limit!',
    headers: true,
});

app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, config.responseDelayMs || 0);
});
app.use(cors({
    origin: config.corsOrigin,
    optionsSuccessStatus: 200,
}));
app.use(limiter);
app.use(bodyParser.json());
app.use('/api', api)

app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found'
    });
});

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
