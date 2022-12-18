const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter email']
    },

    password : {
        type : String,
        required : [true, 'Please enter password']
    }
})

module.exports = mongoose.model('Auth', authSchema);