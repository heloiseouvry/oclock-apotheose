const CoreModel = require('./coreModel');
const Phase = require('./phase');
const db = require('../database.js');

/**
 * An entity representing an User
 * @class User
 */

/**
 * An entity representing an User
 * @typedef User
 * @property {number} id
 * @property {string} lastname
 * @property {string} firstname
 * @property {number} phone_number
 * @property {string} role
 * @property {string} email
 * @property {string} password
 * @property {string} status
 * @property {datetz} birth_date
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

class User extends CoreModel {

    /**
     * Fetches an user by his email
     * @param {String} email a string representing an email
     * @returns an object User who matches this email
     */

    static async findByEmail(email) {

        try {
            const preparedQuery = {
                text: `SELECT (lastname, firstname, phone_number, role, email, status, birth_date, password, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id) FROM "user" WHERE email=$1;`,
                values: [email]
            };
            const { rows } = await db.query(preparedQuery);
            if(rows.length){
                return new User(rows[0]);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }

    }

    /**
     * Send an update or insert request to the database if there is an id(update) or not (insert)
     * @returns {Object} an object user with all the properties from the database
     */
    async save() {
        if(this.id){
            
            try {
                const preparedQuery = {
                    text:`UPDATE "user" SET (lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id)=($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $18) WHERE id = $17`,
                    values: [this.lastname, this.firstname, this.phone_number, this.role, this.email, this.status, this.birth_date, this.birth_city, this.birth_department, this.ssn, this.intermittent_registration, this.legal_entity, this.siret, this.emergency_contact, this.emergency_phone_number, this.comments, this.id, this.address_id]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }

        } else {
            try {
                const preparedQuery = {
                    text: 'INSERT INTO "user"(lastname, firstname, phone_number, role, email, password, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id',
                    values: [this.lastname, this.firstname, this.phone_number, this.role, this.email, this.password, this.status, this.birth_date, this.birth_city, this.birth_department, this.ssn, this.intermittent_registration, this.legal_entity, this.siret, this.emergency_contact, this.emergency_phone_number, this.comments, this.address_id]
                }
                const { rows } = await db.query(preparedQuery);
                this.id = rows[0].id;
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }
        }
    }

    /**
     * Fetches all users from the database
     * @returns {Array<User>} an array of all users (object) in database
     */
    static async findAll() {
        const data = await CoreModel.fetch('SELECT (lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id) FROM "user";');
        console.log("findall : ",data);
        return data.map(d => new User(d));
    }

    static async findAllWithJob() {
        const data = await CoreModel.fetch(`
            SELECT "user".lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id, array_agg(job.type) AS job FROM "user"
            FULL OUTER JOIN user_has_job ON user_has_job.user_id = "user".id
            FULL OUTER JOIN job ON user_has_job.job_id = job.id
            GROUP BY "user".id,lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id;`);
            console.log("findall with jobs : ", data);
        return data.map(d => new User(d));
    }

    static async findOneWithJob(id) {
        const data = await CoreModel.fetch(`
            SELECT lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id, array_agg(job.type) AS job FROM "user" 
            JOIN user_has_job ON user_has_job.user_id = "user".id
            JOIN job ON user_has_job.job_id = job.id
            WHERE "user".id=$1
            GROUP BY lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id;`,[id]);
            console.log(data);
        return data.map(d => new User(d));
    }

    static async getAllUsersSalary(start_date, end_date) {
        const data = await CoreModel.fetch(`
        SELECT "user".id, "user".lastname, "user".firstname, job.type, phase.start_date, phase.end_date, phase.title, event.title AS event_title, event.color, phase_has_user.salary 
        from phase_has_user
        JOIN phase ON phase_has_user.phase_id = phase.id
        JOIN "user" ON phase_has_user.user_id = "user".id
        JOIN user_has_job ON user_has_job.user_id = "user".id
        JOIN job ON user_has_job.job_id = job.id
        JOIN event ON event.id = phase.event_id
        WHERE phase.start_date >= $1 AND phase.start_date < $2;`, [start_date, end_date]);
        console.log("data", data);
        return data.map(d => new User(d));
    }

    static async getOneUserSalary(start_date, end_date, id) {
        const data = await CoreModel.fetch(`
        SELECT "user".id, "user".lastname, "user".firstname, job.type, phase.start_date, phase.end_date, phase.title, event.title AS event_title, event.color, phase_has_user.salary 
        from phase_has_user
        JOIN phase ON phase_has_user.phase_id = phase.id
        JOIN "user" ON phase_has_user.user_id = "user".id
        JOIN user_has_job ON user_has_job.user_id = "user".id
        JOIN job ON user_has_job.job_id = job.id
        JOIN event ON event.id = phase.event_id
        WHERE phase.start_date >= $1 AND phase.start_date < $2 AND "user".id = $3;`, [start_date, end_date, id]);
        return data.map(d => new User(d));
    }

    /**
     * Fetches a single user from the database
     * @param {Number} id 
     * @returns an object user who matches this id
     */
    static async findById(id){
        return(new User(await CoreModel.fetchOne('SELECT lastname, firstname, phone_number, role, email, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments, address_id FROM "user" WHERE id = $1;', [id])));
    }

    static async findUsersByType(type) {
        const data = await CoreModel.fetch(`
        SELECT "user".*, job.type FROM "user"
        JOIN user_has_job ON user_has_job.user_id = "user".id
        JOIN job ON user_has_job.job_id = job.id
        WHERE job.type = $1;`, [type]);
        return data.map(d => new User(d));
    }

    static async findAvailableUsers(new_start_date, new_end_date) {
        const data = await CoreModel.fetch(`
        WITH conflict_phases AS (
            SELECT id from phase
            WHERE start_date <= $2 AND end_date >= $1
        ),
        conflict_techs AS (
            SELECT DISTINCT user_id FROM phase_has_user 
            JOIN conflict_phases ON conflict_phases.id = phase_has_user.phase_id
        )
        SELECT "user".* FROM "user"
        LEFT JOIN conflict_techs ON "user".id = conflict_techs.user_id
        WHERE conflict_techs.user_id IS NULL;`, [new_start_date, new_end_date]);
        return data.map(d => new User(d));
    }

    static async findAvailableUsersByType(type, new_start_date, new_end_date) {
        const data = await CoreModel.fetch(`
        WITH conflict_phases AS (
            SELECT id from phase
            WHERE start_date <= $3 AND end_date >= $2
        ),
        conflict_techs AS (
            SELECT DISTINCT user_id FROM phase_has_user 
            JOIN conflict_phases ON conflict_phases.id = phase_has_user.phase_id
        ),
        available_techs AS (
            SELECT "user".* FROM "user"
            LEFT JOIN conflict_techs ON "user".id = conflict_techs.user_id
            WHERE conflict_techs.user_id IS NULL
        )
        SELECT available_techs.* FROM available_techs
        JOIN user_has_job ON user_has_job.user_id = available_techs.id
        JOIN job ON user_has_job.job_id = job.id
        WHERE job.type = $1;`, [type, new_start_date, new_end_date]);
        return data.map(d => new User(d));
    }

    /**
     * send a delete request of an user by his id in database
     * @returns {error} in the case of the delete request didn't work
     */
    async delete() {
        console.log(this.id);
        try {
            const preparedQuery = {
                text: `DELETE FROM "user" WHERE id=$1;`,
                values: [this.id]
            };
            await db.query(preparedQuery);

        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }

    async findPlanning() {
        try {
            const data = await CoreModel.fetch(
                `SELECT phase.* 
                FROM phase_has_user 
                JOIN phase ON phase.id = phase_has_user.phase_id
                WHERE phase_has_user.user_id = $1;`, 
                [this.id]);
            return data.map(d => new Phase(d));
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }

    async jobToTech(id){
        try {
            const preparedQuery = {
                text: 'INSERT INTO user_has_job (user_id, job_id) VALUES ($1, $2);',
                values: [this.id, id]
            };
            await db.query(preparedQuery);
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }
}

module.exports = User;