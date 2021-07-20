const CoreModel = require('./coreModel');

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
            //TODO : coder l'update d'un user
            console.log("Edit event");
        } else {
            try {
                return new Event(await CoreModel.fetchOne('INSERT INTO event(title, start_date, duration, color, user_id, address_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [this.title, this.start_date, this.duration, this.color, this.user_id, this.address_id]));
            } catch (error) {
                console.error(error);
                throw new Error(error.detail);
            }
        }
    }
}

module.exports = Event;