const Memory = require('../model/memoryItems');

const getAllMemories = async(req, res) => {
    res.status(200).json({msg : 'Data sent success'})
}

const createMemory = async(req, res) => {
    try {
        req.body.file = req.file.filename   // putting filename in req body to save the filename in db
        const memory = await Memory.create(req.body);
        res.status(200).json({
            success : true,
            data : memory
        })
    } catch (error) {

        res.status(400).json({
            success : false,
            data : error.message
        })
    }
   
}

module.exports = {getAllMemories, createMemory};