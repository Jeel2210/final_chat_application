const {
    stripe: {
        KEY
    }
} = require('./../../configuration/constants');
const stripe = require('stripe')(KEY);

const {
    convertToCents
} = require('../helpers/general');

class StipeHelper {

    async crateCustomer(data) {
        return await stripe.customers.create(data);
    }

    //Create a card token to while add a card...
    async createCardToken(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let obj = {
                    card: {
                        number: data.number,
                        exp_month: +data.exp_month,
                        exp_year: +data.exp_year,
                        cvc: data.cvc,
                        name: data.name
                    }
                }
                // console.log(`Final Obj is ::: `, obj);
                const token = await stripe.tokens.create(obj);

                resolve(token);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }

    async createAccount(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const account = await stripe.accounts.create({
                    type: 'custom',
                    country: 'US',
                    email: data.email,
                    capabilities: {
                        card_payments: { requested: true },
                        transfers: { requested: true },
                    },
                });
                resolve(account);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }

    //Crate a payment Method and pass Card details and it will return payment method...
    async createPaymentMethod(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const paymentMethod = await stripe.paymentMethods.create({
                    type: 'card',
                    card: {
                        number: data.number,
                        exp_month: data.exp_month,
                        exp_year: data.exp_year,
                        cvc: data.cvc
                    },
                });
                resolve(paymentMethod);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }


    // Create a card Source add attach card with user...
    // https://stripe.com/docs/api/cards/create
    async createCardSource(stripe_customer_id, card_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const card = await stripe.customers.createSource(
                    stripe_customer_id,
                    { source: card_id }
                );
                resolve(card);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }


    //Retrieve a PaymentMethod...
    //https://stripe.com/docs/api/payment_methods/retrieve
    async retrivePaymentMethod(data) {
        return await stripe.paymentMethods.retrieve(data.paymentIntent);
    }

    // Authorize  amount in stripe...
    //https://stripe.com/docs/payments/capture-later#authorize-only
    async authorizePayment(data) {
        // console.log(`Data for authorise data ::: `, data);
        return new Promise(async (resolve, reject) => {
            try {
                let obj = {
                    amount: convertToCents(data.amount),
                    currency: 'usd',
                    payment_method_types: ['card'],
                    capture_method: 'manual',
                    // application_fee_amount: convertToCents(data.amount *0.05), // 5% as a plateform fees...
                    payment_method: data.payment_method, // Need to pass from ahead, By specific user's card payment method (createPaymentMethod)...     https://stripe.com/docs/api/payment_intents/create#create_payment_intent-payment_method
                    customer: data.customer,
                    // transfer_group: '115', // Mostly it will be trade id which we wiill pass in this trasnfer group value...
                    confirm: true
                }
                // console.log(obj);
                const paymentIntent = await stripe.paymentIntents.create(obj);

                console.log(`paymentIntent ::: `, paymentIntent);

                // payment_method ==> Pass the user card...                        
                resolve(paymentIntent);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }


    // Capture the fund...
    //https://stripe.com/docs/payments/capture-later#authorize-only
    async captureFund(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const intent = await stripe.paymentIntents.capture(data.paymentIntent, {
                    amount_to_capture: convertToCents(data.amount),
                    // application_fee_amount: data.application_fee_amount
                })
                resolve(intent);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }

    //Cancel the captured amount...
    async cancelCapturedAmount(data) {
        return new Promise(async (resolve, reject) => {
            try {
                await stripe.paymentIntents.cancel(data.paymentIntent);
                resolve(true);
            } catch (err) {
                // console.log(err);
                reject(err);
            }
        });
    }



    //Update user's Card Details...
    //https://stripe.com/docs/api/cards/update
    async updateCardDetails(cardDetails, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const card = await stripe.customers.updateSource(
                    cardDetails.stripe_customer_id,
                    cardDetails.card_id,
                    body
                );
                resolve(card);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    //https://stripe.com/docs/api/charges/create
    async createCharge(card, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const charge = await stripe.charges.create({
                    amount: convertToCents(body.amount),
                    currency: 'usd',
                    source: card.id,
                    description: 'Store sell the item',
                });
                resolve(charge);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

}

module.exports = new StipeHelper();