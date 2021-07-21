const CoreModel = require('./coreModel');
const db = require('../database.js');

class User extends CoreModel {
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

    async save() {
        if(this.id){
            console.log("dans le model : ",this);
            //TODO : coder l'update d'un user
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

    static async findAll() {
        const data = await CoreModel.fetch('SELECT * FROM "user";');
        return data.map(d => new User(d));
    }

    static async findById(id){
        return(new User(await CoreModel.fetchOne('SELECT * FROM "user" WHERE id = $1;', [id])));
    }

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