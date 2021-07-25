const options = {
    swaggerDefinition: {
        info: {
            description: 'A planning management API',
            title: 'Kapouevent',
            version: '1.0.0',
        },
        host: `localhost:${process.env.PORT}`,
        basePath: '/v1',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
    },
    basedir: __dirname, //app absolute path
    files: ['../../app/**/*.js'] //Path to the API handle folder
};

module.exports = options;