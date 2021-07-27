const CoreModel = require('./coreModel');
const db = require('../database.js');

/**
 * An entity representing an User
 * @class Event
 */

/**
 * An entity representing an Event
 * @typedef Event
 * @property {number} id
 * @property {string} title
 * @property {timestamptz} start_date
 * @property {number} duration
 * @property {string} color
 * @property {number} user_id
 * @property {number} address_id
 */
class Event extends CoreModel {
    /**
     * Fetches all events from the database
     * @returns {Array<Event>} an array of all events (object) in database
     */
    static async findAll() {
        const data = await CoreModel.fetch('SELECT * FROM event;');
        return data.map(d => new Event(d));
    }

    /**
     * Fetches a single event from the database
     * @param {Number} id 
     * @returns {object} an object event who matches this id
     */
    static async findById(id){
        return(new Event(await CoreModel.fetchOne('SELECT * FROM event WHERE id = $1;', [id])));
    }

    /**
     * Send an update or insert request to the database if there is an id(update) or not (insert)
     * @returns {object} an object event with all the properties from the database
     */
    async save(){
        if(this.id){
            try {
                const preparedQuery = {
                    text:`UPDATE event SET (title, start_date, end_date, color, user_id, address_id)=($1, $2, $3, $4, $5, $6) WHERE id = $7`,
                    values: [this.title, this.start_date, this.end_date, this.color, this.user_id, this.address_id, this.id]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }
        } else {
            try {
                const preparedQuery = {
                    text: 'INSERT INTO event (title, start_date, end_date, color, user_id, address_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
                    values: [this.title, this.start_date, this.end_date, this.color, this.user_id, this.address_id]
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
     * send a delete request of an event by his id in database
     * @returns {error} in the case of the delete request didn't work
     */
    async delete() {
        try {
            const preparedQuery = {
                text: `DELETE FROM event WHERE id=$1;`,
                values: [this.id]
            };
            await db.query(preparedQuery);

        } catch (error) {
            console.error(error);
            throw new Error(error.detail);
        }
    }
}

module.exports = Event;