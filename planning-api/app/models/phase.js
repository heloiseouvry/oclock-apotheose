const CoreModel = require('./coreModel');
const db = require('../database.js');

class Phase extends CoreModel{
    static async findAll() {
        const data = await CoreModel.fetch('SELECT * FROM phase;');
        return data.map(d => new Phase(d));
    }

    static async findById(id){
        return(new Phase(await CoreModel.fetchOne('SELECT * FROM phase WHERE id = $1;', [id])));
    }
    
    async save(){
        if(this.id){
            //TODO : coder l'update d'une phase
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