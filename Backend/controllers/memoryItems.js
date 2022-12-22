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

const likeDislikeMemory = async (req, res) => {

    try {

        const user = req.user;
        const likedUserId = req.params.id;

        const likedUserData = await Memory.find({_id : likedUserId});
        
        const findUser = likedUserData[0].likes.find((ele) => ele === user._id);

        let userData;

        if(findUser){
            userData = likedUserData[0].likes.filter((ele) => ele !== user._id);
            likedUserData[0].likes = userData;
        }   
        else{
            likedUserData[0].likes.push(user._id);
        }

        const updatedLikeData = await Memory.replaceOne({'_id' : likedUserId}, likedUserData[0])

        console.log(updatedLikeData);
        res.status(200).json({
            success : true,
            data : updatedLikeData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}

const currentUser = async(req, res) => {

    try {
        res.status(200).json({
            success : true,
            user : req.user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}



module.exports = { getAllMemories, createMemory, likeDislikeMemory, currentUser };