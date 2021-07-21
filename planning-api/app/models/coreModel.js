const db = require('../database');

class NoDataError extends Error {
    constructor(entity = 'data', filter = 'filter') {
        super();
        this.message = `no ${entity} found with this ${filter}`;
    }
}

class CoreModel {

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async fetch(...args) {
        const { rows } = await db.query(...args);
        if (rows.length === 0) {
            throw new NoDataError();
        }
        return rows;
    }

    static async fetchOne(...args) {
        return (await this.fetch(...args))[0];
    }
}

module.exports = CoreModel;