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
class Phase extends CoreModel{

    /**
     * Fetches all phases from the database
     * @returns {Array<Phase>} an array of all phases (object) in database
     */
    static async findAll() {
        const data = await CoreModel.fetch('SELECT * FROM phase;');
        return data.map(d => new Phase(d));
    }

    /**
     * Fetches a single phase from the database
     * @param {Number} id 
     * @returns {object} an object phase who matches this id
     */
    static async findById(id){
        return(new Phase(await CoreModel.fetchOne('SELECT * FROM phase WHERE id = $1;', [id])));
    }
    
    /**
     * Send an update or insert request to the database if there is an id(update) or not (insert)
     * @returns {object} an object phase with all the properties from the database
     */
    async save(){
        if(this.id){
            
            try {
                const preparedQuery = {
                    text:`UPDATE phase SET (title, start_date, duration, type, internal_location, tech_manager_contact, provider_contact, number_fee, comments, event_id, vehicle_id, user_id) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                    values: [this.title, this.start_date, this.duration, this.type, this.internal_location, this.tech_manager_contact, this.provider_contact, this.number_fee, this.comments, this.event_id, this.vehicle_id, this.user_id]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }

        } else {
            try {
                const preparedQuery = {
                    text:'INSERT INTO phase (title, start_date, duration, type, internal_location, tech_manager_contact, provider_contact, number_fee, comments, event_id, vehicle_id, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id', 
                    values: [this.title, this.start_date, this.duration, this.type, this.internal_location, this.tech_manager_contact, this.provider_contact, this.number_fee, this.comments, this.event_id, this.vehicle_id, this.user_id]
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
        // console.log(this.id);
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
}

module.exports = Phase;