const { Router } = require('express');

const router = new Router();

const mainController = require('./controllers/mainController');
const eventController = require('./controllers/eventController');
const phaseController = require('./controllers/phaseController');

router.post('/contact', mainController);
router.post('/login', mainController.loginSubmit);

router.get('/events', eventController);
router.post('/events', eventController);
router.get('/events/:id', eventController);
router.patch('/events/:id', eventController);
router.delete('/events/:id', eventController);

router.post('/phase', phaseController);
router.get('/phase/:id', phaseController);
router.patch('/phase/:id', phaseController);
router.delete('/phase/:id', phaseController);

router.get('/users', mainController);

module.exports = router;