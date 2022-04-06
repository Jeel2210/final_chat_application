/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const axios = require('axios');
const{
    googleSearch: {
        CX,
        KEY

    }
} = require('./../../configuration/constants');
const URL = "https://www.googleapis.com/customsearch/v1?key=" + KEY + "&cx=" + CX + "&q=";
exports.getBarcodeWebValidation = async  (barcode) => {
    return new Promise((resolve, reject) => {
        axios.get(URL + barcode)
                .then(function (response) {
                    // handle success
                    resolve(response.data);
                })
                .catch(function (error) {
                    // handle error
                    // console.log(error);
                    reject(error);
                });
    });
};

exports.validateWebBarcodeData = async (data) => {
    let total = data.length;
    for (let i = 0; i < total; i++) {
        // console.log(data[i]);
    }
};