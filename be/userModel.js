const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user model
let User = new Schema({
    name: {
        type: String
    },
    dob: {
        type: String
    },
    ms: {
        type: String
    },
    smoking: {
        type: String
    }
});

module.exports = mongoose.model('User', User);