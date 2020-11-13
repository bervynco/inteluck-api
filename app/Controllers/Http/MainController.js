'use strict'

class MainController {
    async getOrderList ({request, response}) {
 		console.log(body);
		try {
			response.json(await getDaysSupply(body.filters));
		} catch (error) {
			console.error('MainController.getOrderList() :', error);
			return response.status(500).send({message: 'Error in retrieving from the DB'});		
		}
    }
    
    async addOrder ({request, response}) {
        const body = request.post();
 		console.log(body);
        try {
            response.json(await addOrder(body));
        } catch (error) {
            console.error('MainController.addOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }
   
    async editOrder ({request, response}) {
        const body = request.post();
        console.log(body);
        try {
            response.json(await editOrder(body));
        } catch (error) {
            console.error('MainController.editOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }

    async deleteOrder ({request, response}) {
        const body = request.post();
        console.log(body);
        try {
            response.json(await getDaysSupply(body.filters));
        } catch (error) {
            console.error('MainController.deleteOrder() :', error);
            return response.status(500).send({message: 'Error in retrieving from the DB'});		
        }
    }
}


module.exports = MainController
