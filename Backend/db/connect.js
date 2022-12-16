const mongoose = require('mongoose');

const uri = 'mongodb+srv://anuj:ORXrVKxj5UeH82zF@cluster0.e4mqjr7.mongodb.net/?retryWrites=true&w=majority';

const connectDB = () => {
    return mongoose.connect(uri, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    });
}

module.exports = connectDB;