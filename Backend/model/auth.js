const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const authSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : [true, 'Please enter name']
    },

    last_name : {
        type : String,
        required : [true, 'Please enter last name']
    },

    email : {
        type : String,
        required : [true, 'Please enter email']
    },

    password : {
        type : String,
        required : [true, 'Please enter password']
    }
});

// Generating token
authSchema.methods.generateAuthToken = function(){
    try {
        const token = JWT.sign({_id : this._id}, process.env.JWT_SECRET);
        return token;

    } catch (error) {
        console.log(error);   
    }
}

authSchema.methods.matchPassword = async function(enterPass){
    return await bcrypt.compare(enterPass, this.password);
}


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