'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')
class Orders extends Model {
    async getAllOrders () {
		let orderList = [];
		
        orderList = await Database.table('orders')
            .select('delivery.delivery_id')
            .select('orders.order_id')
            .select('orders.order_description')
            .select('orders.order_origin_address')
            .select('orders.order_destination_address')
            .select('orders.created_at as Order Created')
            .select('delivery.created_at as Delivery Created')
            .select('delivery.updated_at as Delivery Updated')
            .select('delivery_status.delivery_status_name')
            .where('active', 1)
            .rightJoin('delivery', 'orders.order_id', 'delivery.order_id')
            .leftJoin('delivery_status', 'delivery_status.delivery_status_id', 'delivery.delivery_status_id')
            .orderBy('Delivery Created');
		return orderList;
    }
    async addOrder (orders) {
        let postRequest = orders;
        let order = await Database.table('orders')
            .insert(postRequest);

        return order;
    }

    async updateOrder (orders) {
        const affectedRows = await Database
            .table('orders')
            .where('orders.order_id', orders.order_id)
            .update('orders.order_origin_address', orders.order_origin_address)
            .update('orders.order_destination_address', orders.order_destination_address)
            .update('orders.order_description', orders.order_description)
        
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

module.exports = Orders
