const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./db/connect');

const app = express();

app.use(express.json());

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 5000;

const memory_routes = require('./routes/memoryItems');
const auth_routes = require('./routes/auth');

app.use('/api/memory', memory_routes);
app.use('/api/memory', auth_routes);


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

