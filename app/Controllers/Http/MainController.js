'use strict'
const OrderList = require('../../Models/Orders');
const Delivery = require('../../Models/Delivery');
const {getAllOrders, addOrder, updateOrder, deleteOrder} = new OrderList();

const {addDelivery} = new Delivery();
class MainController {

    constructJsonArray(json) {
        json['delivery'] = [];
        json['delivery'].push({
            'Delivery Created': json['Delivery Created'],
            'Delivery Updated': json['Delivery Updated'],
            'Delivery Status Name': json['delivery_status_name']
        });
        delete json['Delivery Created'];
        delete json['Delivery Updated'];
        delete json['delivery_status_name'];
        delete json['delivery_id'];

        return json;
    }
    async getOrderList ({request, response}) {
         // console.log(body);
        
        let index;
		try {
            let jsonReturn = await getAllOrders();
            let returnArray = [];
            jsonReturn.forEach(json => {
                if(returnArray.length === 0){
                    let newJson = this.constructJsonArray(json);
                    returnArray.push(newJson);
                }
                else{
                    index = returnArray.findIndex(jsonObject => 
                        jsonObject.order_id === json.order_id
                    );
                    if(index === -1){
                        let newJson = this.constructJsonArray(json);
                        returnArray.push(newJson);
                    }
                    else {
                        returnArray[index]['delivery'].push({
                            'Delivery Created': json['Delivery Created'],
                            'Delivery Updated': json['Delivery Updated'],
                            'Delivery Status Name': json['delivery_status_name']
                        });
                    }
                }
            });

            console.log(await returnArray);
            response.json(await returnArray);
		} catch (error) {
			console.error('MainController.getAllOrders() :', error);
			return response.status(500).send({message: 'Error in retrieving from the DB'});		
		}
    }
    
    async addOrder ({request, response}) {
        const body = request.post();

        const delivery = {
            'order_id': body.order_id,
            'delivery_status_id': 1
        }
 		console.log(body);
        try {
            let jsonReturn = addOrder(body);
            response.json(await addDelivery(delivery));
        } catch (error) {
            console.error('MainController.addOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }
   
    async editOrder ({request, response}) {
        const body = request.post();
        console.log(body);
        try {
            response.json(await updateOrder(body));
        } catch (error) {
            console.error('MainController.editOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }

    async deleteOrder ({request, response}) {
        const body = request.post();
        const orderId = body.order_id;
        try {
            response.json(await deleteOrder(orderId));
        } catch (error) {
            console.error('MainController.deleteOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }
}


module.exports = MainController
