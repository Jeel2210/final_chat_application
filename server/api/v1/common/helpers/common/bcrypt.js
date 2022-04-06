var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
exports.hashedPassword = (async(password) => {
    return await bcrypt.hashSync(password, salt);

})

exports.isPasswordMatched = (async(password, hash) => {

    return await bcrypt.compareSync(password, hash);

})