const CoreModel = require('./coreModel');
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
                text: `SELECT * FROM "user" WHERE email=$1;`,
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
                    text:`UPDATE "user" SET (lastname, firstname, phone_number, role, email, password, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments)=($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
                    values: [this.lastname, this.firstname, this.phone_number, this.role, this.email, this.password, this.status, this.birth_date, this.birth_city, this.birth_department, this.ssn, this.intermittent_registration, this.legal_entity, this.siret, this.emergency_contact, this.emergency_phone_number, this.comments]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }

        } else {
            try {
                const preparedQuery = {
                    text: 'INSERT INTO "user"(lastname, firstname, phone_number, role, email, password, status, birth_date, birth_city, birth_department, ssn, intermittent_registration, legal_entity, siret, emergency_contact, emergency_phone_number, comments) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id',
                    values: [this.lastname, this.firstname, this.phone_number, this.role, this.email, this.password, this.status, this.birth_date, this.birth_city, this.birth_department, this.ssn, this.intermittent_registration, this.legal_entity, this.siret, this.emergency_contact, this.emergency_phone_number, this.comments]
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
        const data = await CoreModel.fetch('SELECT * FROM "user";');
        return data.map(d => new User(d));
    }

    /**
     * Fetches a single user from the database
     * @param {Number} id 
     * @returns an object user who matches this id
     */
    static async findById(id){
        return(new User(await CoreModel.fetchOne('SELECT * FROM "user" WHERE id = $1;', [id])));
    }

    /**
     * send a delete request of an user by his id in database
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
}

module.exports = User;