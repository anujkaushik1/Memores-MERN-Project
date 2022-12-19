const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

const app = express();

dotenv.config({ path: ".env" });


app.use(express.json());

app.use(cors({
    origin: [process.env.REACT_APP_URL],
    credentials : true
}));

app.use('/uploads', express.static('uploads'));

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

