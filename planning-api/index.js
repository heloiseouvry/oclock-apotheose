require('dotenv').config({path : './.env'});
const cors = require('cors');
const express = require('express');
const authMW = require('./app/middlewares/authMW');
const adminMW = require('./app/middlewares/adminMW');
const swaggerConfig = require('./app/middlewares/swagger.js')

const app = express();

const router = require('./app/router');
const adminRouter = require('./app/adminRouter');
const expressSwagger = require('express-swagger-generator')(app);

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
expressSwagger(swaggerConfig);

app.get('/', (request, response) => {
    response.redirect('/api-docs');
})

app.use('/v1', router);
app.use('/admin', authMW, adminMW, adminRouter);

app.listen(port, () => console.log('API running on http://localhost:' + port));