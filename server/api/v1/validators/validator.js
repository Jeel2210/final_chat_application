const Joi = require('joi');
var Promise = require("bluebird");

class Validator {
    async addProductValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                name: Joi.string().required(),
                username: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
            })

            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }
    async salesAndPurchaseValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                product_id: Joi.number().required(),
                quantity: Joi.number().required(),
                status: Joi.string().trim().valid("purchase", "sales").required()
            });
            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }

    async totalSalesMonthVised(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                product_id: Joi.number().required(),
                quantity: Joi.number().required(),
                status: Joi.string().trim().valid("purchase", "sales").required()
            });
            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }

    async addUserValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                username: Joi.string().trim().required(),
                password: Joi.string().trim().min(8).required(),
                name: Joi.string().trim().required(),
                email: Joi.string().required()
                    .email({
                        minDomainSegments: 2,
                        tlds: {
                            allow: ['com']
                        }
                    }),
            })

            try {
                const value = await schema.validateAsync(body);

                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err.message);
                reject(err.details[0]);
            }
        })

    }


    async userLoginValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                email: Joi.string().required()
                    .email({
                        minDomainSegments: 2,
                        tlds: {
                            allow: ['com']
                        }
                    }),
                password: Joi.string().min(8).required(),

            })

            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }


    async editProductValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                id: Joi.number().required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                description: Joi.string().required()
            })

            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }


    async deleteProductValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                id: Joi.number().required()
            })

            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }


    async getProductListValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                page: Joi.number().required(),
                pagesize: Joi.number().optional(),
                id: Joi.number().optional(),
                searchStr: Joi.string().optional()
            })

            try {
                const value = await schema.validateAsync(body);
                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0].message);
            }
        })

    }



    async addUserChatValidator(body) {
        return new Promise(async(resolve, reject) => {
            const schema = Joi.object({
                room: Joi.string().trim().lowercase({ force: true }).required(),
                username: Joi.string().trim().required(),
            })

            try {
                const value = await schema.validateAsync(body);

                resolve();
            } catch (err) {
                console.log("It's an error ::: ", err);
                reject(err.details[0]);
            }
        })

    }

}

module.exports = new Validator();