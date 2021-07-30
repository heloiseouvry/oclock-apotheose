const { Router } = require('express');
const router = new Router();

const { mainController, authController, eventController, phaseController, userController, addressController } = require('./controllers');
const { userSchema } = require('./schemas');
const authMW = require('./middlewares/authMW');
const { validateBody } = require('./middlewares/validator');
const { User } = require('./models');

// router.post('/contact', mainController);
router.post('/login', authController.loginSubmit);


// Routes to remove after we put back authRouter 
/**
 * Respond with all events in database
 * @route GET /events
 * @groups Events
 * @returns {Array<Event>} 200 - An array of events
 */
router.get('/events', eventController.getAllEvents);

/**
 * Expected json object in request body
 * @typedef ReqEventJson
 * @property {string} title
 * @property {timestamptz} start_date
 * @property {number} duration
 * @property {string} color
 * @property {number} user_id
 * @property {number} address_id
 */

/**
 * Add a new event in database
 * @route POST /events
 * @group Events
 * @param {ReqEventJson.model} object.body.required JSON Event object to add in database
 * @returns {Event.model} 200 - The newly created event
 * @returns {string} 500 - An SQL error message
 */
router.post('/events', eventController.addEvent);

/**
 * Responds with one event from database
 * @route GET /events/{id}
 * @group Events
 * @param {number} id.path.required The id of the event to fetch
 * @returns {Event.model} 200 - A single event identified by its id
 */
router.get('/events/:id(\\d+)', eventController.getOneEvent);
router.patch('/events/:id(\\d+)', eventController.editEvent);

router.delete('/events/:id(\\d+)', eventController.deleteEvent);

/**
 * Respond with all phase in database
 * @route GET /phases
 * @groups Phases
 * @returns {Array<Phase>} 200 - An array of phases
 */
router.get('/phases', phaseController.getAllPhases);
router.get('/phaseswithusersandsalary', phaseController.getAllPhasesWithUsersAndSalary);

/**
 * Expected json object in request body
 * @typedef ReqPhaseJson
 * @property {string} title
 * @property {timestamptz} start_date
 * @property {number} duration
 * @property {string} type
 * @property {string} internal_location
 * @property {string} tech_manager_contact
 * @property {string} provider_contact
 * @property {number} number_fee
 * @property {string} comments
 * @property {number} event_id
 * @property {number} vehicle_id
 * @property {number} user_id
 */

/**
 * Add a new event in database
 * @route POST /phases
 * @group Phases
 * @param {ReqPhaseJson.model} object.body.required JSON Phase object to add in database
 * @returns {Phase.model} 200 - The newly created phase
 * @returns {string} 500 - An SQL error message
 */
router.post('/phases', phaseController.addPhase);
router.post('/phases/:id(\\d+)/assign', phaseController.assignTech);
router.delete('/phases/:id(\\d+)/unassign', phaseController.deleteTechAssigned);
router.get('/phases/:id(\\d+)/techsinfo', phaseController.techsInfo);

/**
 * Responds with one event from database
 * @route GET /phases/{id}
 * @group Phases
 * @param {number} id.path.required The id of the phase to fetch
 * @returns {Phase.model} 200 - A single phase identified by its id
 */
router.get('/phases/:id(\\d+)', phaseController.getOnePhase);
router.patch('/phases/:id(\\d+)', phaseController.editPhase);
router.delete('/phases/:id(\\d+)', phaseController.deletePhase);

/**
 * Respond with all users in database
 * @route GET /users
 * @groups Users
 * @returns {Array<User>} 200 - An array of Users
 */
router.get('/users', userController.getAllUsers);
router.get('/usersjob', userController.getAllUsersWithJob);
router.get('/userssalary', userController.getAllUsersSalary);

/**
 * Expected json object in request body
 * @typedef ReqUserJson
 * @property {string} lastname
 * @property {string} firstname
 * @property {number} phone_number
 * @property {string} role
 * @property {string} email
 * @property {string} password
 * @property {string} status
 * @property {timestamptz} birth_date
 * @property {string} birth_city
 * @property {string} birth_department
 * @property {string} ssn
 * @property {string} intermittent_registration
 * @property {string} legal_entity
 * @property {string} siret
 * @property {string} emergency_contact
 * @property {number} emergency_phone_number
 * @property {string} comments
 */

/**
 * Add a new user in database
 * @route POST /users
 * @group Users
 * @param {ReqUserJson.model} object.body.required JSON User object to add in database
 * @returns {User.model} 200 - The newly created user
 * @returns {string} 500 - An SQL error message
 */
router.post('/users', validateBody(userSchema), userController.addUser);

/**
 * Responds with one user from database
 * @route GET /users/{id}
 * @group Users
 * @param {number} id.path.required The id of the user to fetch
 * @returns {User.model} 200 - A single user identified by its id
 */
router.get('/users/:id(\\d+)', userController.getOneUser);
router.patch('/users/:id(\\d+)', userController.editUser);
router.delete('/users/:id(\\d+)', userController.deleteUser);
router.get('/users/planning', authMW, userController.getUserPlanning);
router.get('/users/:type', userController.getUsersByType);

// router.get('/available_users', userController.getAvailableUsers);
// router.get('/available_users/:type', userController.getAvailableUsersByType);

router.get('/address', addressController.getAllAddresses);
router.post('/address', addressController.addAddress);
router.get('/address/:id(\\d+)', addressController.getAddressById);
router.patch('/address/:id(\\d+)', addressController.editAddress);
router.delete('/address/:id(\\d+)', addressController.deleteAddress);

module.exports = router;