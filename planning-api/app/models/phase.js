const CoreModel = require('./coreModel');

class Phase extends CoreModel{
    title;
    start_date;
    duration;
    type;
    internal_location;
    tech_manager_contact;
    provider_contact;
    number_fee;
    comments;
    event_id;
    vehicle_id;
    user_id;

    constructor(data){
        super(data);
        this.title = data.title;
        this.start_date = data.start_date;
        this.duration = data.duration;
        this.type = data.type;
        this.internal_location = data.internal_location;
        this.tech_manager_contact = data.tech_manager_contact;
        this.provider_contact = data.provider_contact;
        this.number_fee = data.number_fee;
        this.comments = data.comments;
        this.event_id = data.event_id;
        this.vehicle_id = data.vehicle_id;
        this.user_id = data.user_id;
    }
}

module.exports = Phase;