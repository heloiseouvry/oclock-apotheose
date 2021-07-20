const CoreModel = require('./coreModel');
const db = require('../database.js');

class User extends CoreModel {
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

    async save() {
        if(this.id){
            //TODO : coder l'update d'un user
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
}

module.exports = User;