'use strict'
const DeliveryStatusList = require('../../Models/DeliveryStatus');
const {getDeliveryStatusList} = new DeliveryStatusList();
class DeliveryStatusController {
    async getDeliveryStatusList ({request, response}) {
       try {
           response.json(await getDeliveryStatusList());
       } catch (error) {
           console.error('DeliveryStatusList.getDeliveryStatusList() :', error);
           return response.status(500).send({message: 'Error in retrieving from the DB'});		
       }
   }
}

module.exports = DeliveryStatusController
