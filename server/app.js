const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes')
const { GenerateError } = require('./helpers')

require('dotenv').config();
app.use([express.json(), cors()]);

app.use('/api', routes)
app.set('port', process.env.PORT || 3000);


app.use((req, res, next) => {
    const error = new GenerateError(404, 'Not Found');
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;