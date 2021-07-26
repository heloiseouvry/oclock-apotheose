const { Router } = require('express');

const router = new Router();

const { eventController, phaseController, userController } = require('./controllers');
const { userSchema } = require('./schemas');
const { validateBody } = require('./middlewares/validator');

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.addEvent);
router.get('/events/:id', eventController.getOneEvent);
router.patch('/events/:id', eventController.editEvent);
router.delete('/events/:id', eventController.deleteEvent);

router.get('/phases', phaseController.getAllPhases);
router.post('/phases', phaseController.addPhase);
router.get('/phases/:id', phaseController.getOnePhase);
router.patch('/phases/:id', phaseController.editPhase);
router.delete('/phases/:id', phaseController.deletePhase);

router.get('/users', userController.getAllUsers);
router.post('/users', validateBody(userSchema), userController.addUser);
router.get('/users/:id', userController.getOneUser);
router.patch('/users/:id', userController.editUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;