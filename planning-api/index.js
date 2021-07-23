require('dotenv').config({path : './.env'});
const cors = require('cors');
const express = require('express');

const app = express();

const router = require('./app/router');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors("*"));

app.use('/v1', router);

app.listen(port, () => console.log('API running on http://localhost:' + port));