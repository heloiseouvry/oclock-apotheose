const { Router } = require('express');
const router = new Router();

const { mainController, authController } = require('./controllers');

// router.post('/contact', mainController);
router.post('/login', authController.loginSubmit);

module.exports = router;