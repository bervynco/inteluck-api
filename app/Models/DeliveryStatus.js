'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class DeliveryStatus extends Model {
    async getDeliveryStatusList () {
		let deliveryStatusList = [];
		
        deliveryStatusList = await Database.table('delivery_status')
            
		return deliveryStatusList;
    }
}

module.exports = DeliveryStatus
