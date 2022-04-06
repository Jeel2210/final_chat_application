const {
    hashedPassword
} = require("./common/bcrypt");

var insertData = async(connection, tableName, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (data.password) {
                let hasPassword = await hashedPassword(data.password);
                data.password = hasPassword;
            }
            let insertData = await connection.query(`INSERT INTO ${tableName} SET ? `, data);
            let res = insertData.insertId
            if (res) resolve(res);
            return res;
        } catch (err) {
            console.error(err);
            reject(err);
        }
    })
}


const deleteData = (connection, tableName, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let qry = `DELETE FROM ${tableName} WHERE ${data}`;
            console.log("===Delete Query===", qry);
            var deletedData = await connection.query(qry);
            if (deletedData) resolve(deletedData);

        } catch (err) {
            reject(err);
        }
    })
}



const updateData = (connection, tableName, data, condition) => {
        return new Promise(async(resolve, reject) => {
                    try {

                        let where = ` ${condition? condition:`1 = 1`}`;
            let qry = `UPDATE ${tableName} SET ? WHERE ${where} `;
           
            console.log("===Update Query===", qry);
            let  updateData = await connection.query(`UPDATE ${tableName} SET ? WHERE ${where} `, data);
           
            resolve(updateData);
           
        } catch (err) {
            reject(err);
        };
    });
};




var selectData = async (connection, table, selectParams, condition) => {
    return new Promise(async (resolve, reject) => {
        try {

            let where = ` ${condition? condition:`1 = 1`}`;
           
            var qry = `SELECT ${selectParams} FROM ${table} WHERE ${where}`;
            console.log("query",qry);
            // var qry2=` SELECT * FROM time_slots t WHERE id NOT IN (7,8,9,15)`
           
            var results = await connection.query(qry);
          
            resolve(results)

        } catch (e) {
            reject(e)
        };
    });
};



module.exports = {
    insertData,
    selectData,
    updateData,
    deleteData,

}