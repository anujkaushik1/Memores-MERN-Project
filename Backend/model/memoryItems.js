const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    user : {
        type : String
    },
    creator : {
        type : String,
        required : [true, 'Please add creator'],
        maxlength : [50, 'Creator cannot be more than 50 char']
    },
    title : {
        type : String,
        required : [true, 'Please add title'],
        maxlength : [50, 'Title cannot be more than 50 char']
    },
    message : {
        type : String,
        requried : [true, 'Please add message'],
        maxlength : [500, 'Message cannot be more than 500 char']
    },

    tags : {
        type : String,
        requried : [true, 'Please add tags'],
        maxlength : [50, 'Tags cannot be more than 50 char']
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },

    file : {
        type : String,
        requried : [true, 'Please add file'],
    },
    
    likes : [String]
})

module.exports = mongoose.model('Memory', memorySchema);