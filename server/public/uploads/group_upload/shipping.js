/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const{
    SHIPPING: {
        PRIVATE_KEY
    }
} = require('./../../configuration/configuration');
const shipping = require('shippo')(PRIVATE_KEY);
const{
    addShippingLabels
} = require('./../../models/shipping');
const mysql = require('./../../connection/dbMaster');
const moment = require("moment");

//get shipping cost using objectId of shipping
exports.getShippingCost = async (objectId) => {
    try {
        return  new Promise((resolve, reject) => {
            let result = shipping.shipment.rates(objectId);
            if (!result)
                reject(result.Error);
            resolve(result);
        });
    } catch (err) {
        // console.log(err);
    }
};
// create new shipping for user 
exports.createShipping = async (addressFrom, addressTo, parcel) => {
    try {
        return await new Promise((resolve, reject) => {
            // console.log('shipping_cost_start', moment().format('DD-MM-YYYY HH:mm:ss'));
            let result = shipping.shipment.create({
                "address_from": addressFrom,
                "address_to": addressTo,
                "parcels": parcel,
                "async": true
            });
            if (!result)
                reject(result.Error);
            // console.log('shipping_cost_end', moment().format('DD-MM-YYYY HH:mm:ss'));
            resolve(result);
        });
    } catch (err) {
        // console.log(err);
    }
};

// generate shipping label for shipping.
exports.generateShippingLabel = async (addressFrom, addressTo, parcel, carrierAccount, serviceLevelToken, tradeId, shippingId) => {
    const connection = await mysql.connection();
    try {
        // console.log("FROM...",addressFrom);
        // console.log("TO...",addressTo);

        let shipment = {
            "address_from": addressFrom,
            "address_to": addressTo,
            "parcels": [parcel]
        }
      
        let shippigLabel = await new Promise((resolve, reject) => {
            // console.log('shipping_label_start', moment().format('DD-MM-YYYY HH:mm:ss'));
            let result = shipping.transaction.create({
                "shipment": shipment,
                "carrier_account": carrierAccount,
                "servicelevel_token": serviceLevelToken
            }, function (err, transaction) {
                // console.log(err);
                // console.log('shipping_label_end', moment().format('DD-MM-YYYY HH:mm:ss'));
                // asynchronously called
                if (err)
                    reject(err);
                resolve(transaction);
            });
        });
        // console.log(shippigLabel,"OPOPOPOPOPOP");

        let updateData = {tracking_id: shippigLabel.object_id, tracking_number: shippigLabel.tracking_number, label_url: shippigLabel.label_url};
        let where = ` trade_id="${tradeId}" and shipping_id="${shippingId}"`;
        await addShippingLabels(connection, updateData, where);
        return shippigLabel;
    } catch (err) {
        // console.log(err);
        return '';
    } finally {
        await connection.release();
    }
};     


//validate billing address..
exports.validateAddress=async(address)=>{
    try {
        return  new Promise((resolve, reject) => {
            let result = shipping.address.create(address);
            if (!result)
                reject(result.Error);
            resolve(result);
        });
    } catch (err) {
        // console.log(err);
    }
}
