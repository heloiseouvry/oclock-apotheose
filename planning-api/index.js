require('dotenv').config({path : './.env'});
const cors = require('cors');
const express = require('express');
const authMW = require('./app/middlewares/authMW');
const swaggerConfig = require('./app/middlewares/swagger.js')

const app = express();

const router = require('./app/router');
const authRouter = require('./app/authRouter');
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors("*"));
expressSwagger(swaggerConfig);

app.get('/', (request, response) => {
    response.redirect('/api-docs');
})

app.use('/v1', router);
// app.use('/v1', authMW, authRouter);

app.listen(port, () => console.log('API running on http://localhost:' + port));