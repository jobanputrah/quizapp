const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const app = express();

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
