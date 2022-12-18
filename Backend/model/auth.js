const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter email']
    },

    password : {
        type : String,
        required : [true, 'Please enter password']
    }
});

authSchema.pre('save', async function(next) {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(this.password, salt);
        this.password = hashedPass;
        next();
        
    } catch (error) {
        next(error);
    }
})      

module.exports = mongoose.model('Auth', authSchema);