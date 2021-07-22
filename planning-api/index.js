require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authMW = require('./app/middlewares/authMW');

const app = express();

const router = require('./app/router');
const authRouter = require('./app/authRouter');

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors("*"));

app.use('/v1', router);
app.use('/v1', authMW, authRouter);

app.listen(port, () => console.log('API running on http://localhost:' + port));