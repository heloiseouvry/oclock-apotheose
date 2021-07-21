const CoreModel = require('./coreModel');
const db = require('../database.js');

class Event extends CoreModel {
    static async findAll() {
        const data = await CoreModel.fetch('SELECT * FROM event;');
        return data.map(d => new Event(d));
    }

    static async findById(id){
        return(new Event(await CoreModel.fetchOne('SELECT * FROM event WHERE id = $1;', [id])));
    }

    async save(){
        if(this.id){
            try {
                const preparedQuery = {
                    text:`UPDATE event SET (title, start_date, duration, color, user_id, address_id)=($1, $2, $3, $4, $5, $6)`,
                    values: [this.title, this.start_date, this.duration, this.color, this.user_id, this.address_id]
                }
                const { rows } = await db.query(preparedQuery);
                 
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }
        } else {
            try {
                const preparedQuery = {
                    text: 'INSERT INTO event (title, start_date, duration, color, user_id, address_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
                    values: [this.title, this.start_date, this.duration, this.color, this.user_id, this.address_id]
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