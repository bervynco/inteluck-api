'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Orders extends Model {
    async getAllOrders () {
		let orderList = [];
		
        orderList = await Database.table('order')
            .where('active', 1)
		return orderList;
    }
    async addOrder (orders) {
        let postRequest = orders;
        orderList = await Database.table('orders')
            .insert(postRequest);
    }

    async updateOrder (orders) {
        const affectedRows = await Database
            .table('orders')
            .where('username', 'tutlage')
            .update('lastname', 'Virk')
        
        return affectedRows;
    }

    async deleteOrder (orderId) {
        const affectedRows = await Database
            .table('orders')
            .where('order_id', orderId)
            .update('active', 0);
		return affectedRows;
    }
}

module.exports = Order
