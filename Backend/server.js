const express = require('express');
const app = express();
const connectDB = require('./db/connect');

const PORT = process.env.PORT || 5000;

const memory_routes = require('./routes/memoryItems');

app.use('/api', memory_routes);


const serverStart = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error.message);
    }
}

serverStart();

