const bcrypt = require('bcrypt');

exports.decrypt = async (hash, password) => {
    return await bcrypt.compare(password, hash);
}