const { Router } = require('express');

const router = new Router();

const { eventController, phaseController, userController, addressController } = require('./controllers');
const { userSchema } = require('./schemas');
const { validateBody } = require('./middlewares/validator');

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.addEvent);
router.get('/events/:id(\\d+)', eventController.getOneEvent);
router.patch('/events/:id(\\d+)', eventController.editEvent);
router.delete('/events/:id(\\d+)', eventController.deleteEvent);

router.get('/phases', phaseController.getAllPhases);
router.get('/phaseswithusersandsalary', phaseController.getAllPhasesWithUsersAndSalary);
router.post('/phases', phaseController.addPhase);
router.post('/phases/:id(\\d+)/assign', phaseController.assignTech);
router.delete('/phases/:id(\\d+)/unassign', phaseController.deleteTechAssigned);
router.get('/phases/:id(\\d+)/techsinfo', phaseController.techsInfo);
router.get('/phases/:id(\\d+)', phaseController.getOnePhase);
router.patch('/phases/:id(\\d+)', phaseController.editPhase);
router.delete('/phases/:id(\\d+)', phaseController.deletePhase);

router.get('/users', userController.getAllUsers);
router.get('/usersjob', userController.getAllUsersWithJob);
router.get('/usersjob/:id(\\d+)', userController.getUsersWithJob);
router.get('/usersfull', userController.getAllUsersWithFullInfo);
router.get('/userssalary', userController.getAllUsersSalary);
router.get('/useronesalary', userController.getOneUserSalary);
router.post('/users', validateBody(userSchema), userController.addUser);
router.get('/users/:id(\\d+)', userController.getOneUser);
router.patch('/users/:id(\\d+)', userController.editUser);
router.delete('/users/:id(\\d+)', userController.deleteUser);
router.post('/userhasjob/:id(\\d+)', userController.matchUserJob)

router.get('/address', addressController.getAllAddresses);
router.post('/address', addressController.addAddress);
router.get('/address/:id(\\d+)', addressController.getAddressById);
router.patch('/address/:id(\\d+)', addressController.editAddress);
router.delete('/address/:id(\\d+)', addressController.deleteAddress);

router.get('/users/planning', userController.getUserPlanning);
router.get('/users/:type', userController.getUsersByType);
router.get('/available_users', userController.getAvailableUsers);
router.get('/available_users/:type', userController.getAvailableUsersByType);

module.exports = router;