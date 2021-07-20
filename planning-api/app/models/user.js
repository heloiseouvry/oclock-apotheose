const CoreModel = require('./coreModel');
const db = require('../database.js');

class User extends CoreModel {
    lastname;
    firstname;
    phone_number;
    role;
    email;
    password;
    status;
    birth_date;
    birth_city;
    birth_department;
    ssn;
    intermittent_registration;
    legal_entity;
    siret;
    emergency_contact;
    emergency_phone_number;
    comments;

    constructor(data) {
        super(data);
        this.lastname = data.lastname;
        this.firstname = data.firstname;
        this.phone_number = data.phone_number;
        this.role = data.role;
        this.email = data.email
        this.password = data.password;
        this.status = data.status;
        this.birth_date = data.birth_date;
        this.birth_city = data.birth_city;
        this.birth_department = data.birth_department;
        this.ssn = data.ssn;
        this.intermittent_registration = data.intermittent_registration;
        this.legal_entity = data.legal_entity;
        this.siret = data.siret;
        this.emergency_contact = data.emergency_contact;
        this.emergency_phone_number = data.emergency_phone_number;
        this.comments = data.comments;
    }

    static async findByEmail(email) {

        try {
            const sqlQuery = {
                text: `SELECT * FROM "user" WHERE email=$1;`,
                values: [email]
            };
            const { rows } = await db.query(sqlQuery);
            return new User(rows[0]);
        } catch (error) {
            console.error(error);
        }

    }
}

module.exports = User;