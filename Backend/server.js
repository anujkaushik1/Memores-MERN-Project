const dotenv = require('dotenv');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;

const memory_routes = require('./routes/memoryItems');

app.use('/api', memory_routes);


const serverStart = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error.message);
    }
}

serverStart();

