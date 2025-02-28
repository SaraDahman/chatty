const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
app.use([express.json(), cors()]);


app.set('port', process.env.PORT || 3000);


module.exports = app;