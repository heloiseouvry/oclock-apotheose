const CoreModel = require('./coreModel');
const db = require('../database.js');

/**
 * An entity representing a Phase
 * @class Phase
 */

/**
 * An entity representing an User
 * @typedef Phase
 * @property {number} id
 * @property {string} title
 * @property {timestamptz} start_date
 * @property {timestamptz} end_date
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
class Phase extends CoreModel{

    /**
     * Fetches all phases from the database
     * @returns {Array<Phase>} an array of all phases (object) in database
     */
    static async findAll() {
        const data = await CoreModel.fetch('SELECT p.*, e.title AS event_title, e.start_date AS event_start_date, e.end_date AS event_end_date, e.address_id, e.color, a.main, a.additional, a.zip_code, a.city FROM phase AS p JOIN event AS e ON e.id = p.event_id JOIN address AS a ON a.id = e.address_id;');
        return data.map(d => new Phase(d));
    }

    static async findAllWithUsersAndSalary() {
        const data = await CoreModel.fetch(`SELECT p.*, p.id, e.title AS event_title, e.start_date AS event_start_date, e.end_date AS event_end_date, e.address_id, e.color, 
        a.main, a.additional, a.zip_code, a.city,
        array_agg(phu.user_id) AS techs, array_agg(phu.salary) AS salary
        FROM phase AS p 
        JOIN event AS e ON e.id = p.event_id 
        JOIN address AS a ON a.id = e.address_id
        JOIN phase_has_user AS phu ON phu.phase_id = p.id
        GROUP BY p.id, e.title, e.start_date, e.end_date, e.address_id, e.color, a.main, a.additional, a.zip_code, a.city;`);
        return data.map(d => new Phase(d));
    }

    /**
     * Fetches a single phase from the database
     * @param {Number} id 
     * @returns {object} an object phase who matches this id
     */
    static async findById(id){
        return(new Phase(await CoreModel.fetchOne('SELECT p.*, e.title AS event_title, e.start_date AS event_start_date, e.end_date AS event_end_date, e.address_id, e.color, a.main, a.additional, a.zip_code, a.city FROM phase AS p JOIN event AS e ON e.id = p.event_id JOIN address AS a ON a.id = e.address_id WHERE p.id = $1;', [id])));
    }

    static async findEventPhaseByEventId(event_id){
        return(new Phase(await CoreModel.fetchOne('SELECT p.*, e.title AS event_title, e.start_date AS event_start_date, e.end_date AS event_end_date, e.address_id, e.color, a.main, a.additional, a.zip_code, a.city FROM phase AS p JOIN event AS e ON e.id = p.event_id JOIN address AS a ON a.id = e.address_id WHERE e.id = $1 AND p.type = $2;', [event_id, 'event'])));
    }
    
    /**
     * Send an update or insert request to the database if there is an id(update) or not (insert)
     * @returns {object} an object phase with all the properties from the database
     */
    async save(){
        if(this.id){
            try {
                const preparedQuery = {
                    text:`UPDATE phase SET (title, start_date, end_date, type, internal_location, tech_manager_contact, provider_contact, number_fee, comments, event_id, vehicle_id, user_id) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) WHERE id = $13`,
                    values: [this.title, this.start_date, this.end_date, this.type, this.internal_location, this.tech_manager_contact, this.provider_contact, this.number_fee, this.comments, this.event_id, this.vehicle_id, this.user_id, this.id]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }

        } else {
            try {
                const preparedQuery = {
                    text:'INSERT INTO phase (title, start_date, end_date, type, internal_location, tech_manager_contact, provider_contact, number_fee, comments, event_id, vehicle_id, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id', 
                    values: [this.title, this.start_date, this.end_date, this.type, this.internal_location, this.tech_manager_contact, this.provider_contact, this.number_fee, this.comments, this.event_id, this.vehicle_id, this.user_id]
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
     * send a delete request of an user by his id in database
     * @returns {error} in the case of the delete request didn't work
     */
    async delete() {
        try {
            const preparedQuery = {
                text: `DELETE FROM phase WHERE id=$1;`,
                values: [this.id]
            };
            await db.query(preparedQuery);
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }

    async assignTech(id, salary = 0){
        try {
            const preparedQuery = {
                text: 'INSERT INTO phase_has_user (user_id, phase_id, salary) VALUES ($1, $2, $3);',
                values: [id, this.id, salary]
            };
            await db.query(preparedQuery);
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }

    async getTechsInfo(){
        try {
            const preparedQuery = {
                text: `SELECT phase_has_user.salary, "user".id, "user".lastname, "user".firstname, "user".phone_number, job.type
                from phase_has_user
                JOIN "user" ON phase_has_user.user_id = "user".id
                JOIN user_has_job ON user_has_job.user_id = "user".id
                JOIN job ON user_has_job.job_id = job.id
                WHERE phase_has_user.phase_id = $1;`,
                values: [this.id]
            };
            const data = await db.query(preparedQuery);
            if (data.rows.length === 0) {
                return null;
            } else {
                return data.rows.map(d => new Phase(d));
            }
        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }
}

module.exports = Phase;