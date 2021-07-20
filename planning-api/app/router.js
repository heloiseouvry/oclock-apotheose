const { Router } = require('express');

const router = new Router();

const { mainController, authController, eventController, phaseController, userController } = require('./controllers');
const { userSchema } = require('./schemas');
const { validateBody } = require('./middlewares/validator');

// router.post('/contact', mainController);
router.post('/login', authController.loginSubmit);

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.addEvent);
// router.get('/events/:id', eventController);
router.patch('/events/:id', eventController.editEvent);
// router.delete('/events/:id', eventController);

// router.post('/phase', phaseController);
// router.get('/phase/:id', phaseController);
// router.patch('/phase/:id', phaseController);
// router.delete('/phase/:id', phaseController);

router.get('/users', userController.getAllUsers);
router.post('/users', validateBody(userSchema), userController.addUser);
router.get('/users/:id', userController.getOneUser);
// router.patch('/users/:id', userController.editUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;