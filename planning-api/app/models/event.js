const CoreModel = require('./coreModel');

class Event extends CoreModel {
    title;
    start_date;
    duration;
    color;
    address_id;
    user_id;

    constructor(data) {
        super(data);
        this.title = data.title;
        this.start_date = data.start_date;
        this.duration = data.duration;
        this.color = data.color;
        this.address_id = data.address_id;
        this.user_id = data.user_id;
    }
}

module.exports = Event;