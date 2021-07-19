  
require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./app/router');

const port = process.env.PORT;

app.use(express.json());

app.use('/v1', router);

app.listen(port, () => console.log('API running on http://localhost:' + port));