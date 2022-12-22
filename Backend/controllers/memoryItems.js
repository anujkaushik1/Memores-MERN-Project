const Memory = require('../model/memoryItems');

const getAllMemories = async (req, res) => {

    try {
        const memoryData = await Memory.find();
        return res.status(200).json({
            success: true,
            length: memoryData.length,
            data: memoryData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }
}

const createMemory = async (req, res) => {
    try {
        req.body.file = req.file.filename   // putting filename in req body to save the filename in db
        req.body.user = req.user;
        const memory = await Memory.create(req.body);
        res.status(200).json({
            success: true,
            data: memory
        })
    } catch (error) {

        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}

const likeMemory = async (req, res) => {

    try {

        const user = req.user;
        const likedUser = req.params.id;

        const likedUserData = await Memory.findOneAndUpdate({
            _id : likedUser
        }, {
            $addToSet : {
                likes : user
            }
        });

        res.status(200).json({
            success : true,
            data : likedUserData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}



module.exports = { getAllMemories, createMemory, likeMemory };