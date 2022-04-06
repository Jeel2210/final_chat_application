/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const  {
    twilio: {
        TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN,
        FROM_NUMBER
    }
} = require('./../../configuration/configuration');

const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// send long message
exports.sendSMS = async (number, message) => {
    try {
        let newMsg = await twilio.messages
                .create({
                    body: message,
                    from: FROM_NUMBER,
                    to: number
                });
        // console.log(newMsg.sid);
        return newMsg;
    } catch (err) {
        // console.log(err);
        return err;
    }

};
// send one time password
exports.sendOTP = async (number, otp) => {
    try {
        let newOTP = await twilio.messages
                .create({
                    body: 'Your verification OTP for Seekrz is ' + otp,
                    from: FROM_NUMBER,
                    to: number
                });
        // console.log(newOTP.sid);
        return newOTP;
    } catch (err) {
        // console.log(err);
        return err;
    }
};