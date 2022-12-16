const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const memory_routes = require('./routes/memoryItems');

app.use('/api', memory_routes);


const server = app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
    
})

