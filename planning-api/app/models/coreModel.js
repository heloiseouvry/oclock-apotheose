const db = require('../database');

class NoDataError extends Error {
    constructor(entity = 'data', filter = 'filter') {
        super();
        this.message = `no ${entity} found with this ${filter}`;
    }
}

/**
 * a model representing the core model
 * @class CoreModel
 */

class CoreModel {

    /**
     * the core model's constructor, used for all other models
     * @param {object} data a litteral object with properties copied into the instance
     */
    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    /**
     * 
     * @param  {...any} args 
     * @returns 
     */
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