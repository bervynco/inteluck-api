'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class Delivery extends Model {
    async addDelivery(delivery) {
        let postRequest = delivery;
        let deliveryData = await Database.table('delivery')
            .insert(postRequest);

        return deliveryData;
    }
}

module.exports = Delivery
