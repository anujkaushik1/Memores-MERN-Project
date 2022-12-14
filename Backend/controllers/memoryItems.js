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
        req.body.file = req.file.filename;   // putting filename in req body to save the filename in db
        req.body.user = req.user;
        const memory = await Memory.create(req.body);
        res.status(200).json({
            success: true,
            data: memory
        })
    } catch (error) {
        console.log(error);
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

        const userData = await Memory.find({ _id: likedUserId });

        const findUser = userData[0].likes.find((ele) => ele === user._id);

        let likeDataArr;
        let isLike = userData[0].isLike;


        if (findUser) {
            likeDataArr = userData[0].likes.filter((ele) => ele !== user._id);
        }
        else {
            const likes = userData[0].likes;
            likes.push(user._id);
            likeDataArr = [...likes];
        }

        const updatedUserData = await Memory.updateOne({
            _id: likedUserId
        }, {
            $set: {
                likes: likeDataArr,
                isLike: !isLike
            }
        });

        res.status(200).json({
            success: true,
            data: updatedUserData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}

const currentUser = async (req, res) => {

    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}

const updateMemoryData = async (req, res) => {

    try {

        const memoryData = req.body;

        if(req.file){
            memoryData.file = req.file.filename;
        }
        else{

            let file = memoryData.file.split('/');
            file = file[file.length - 1];
            memoryData.file = file;

        }

        const updateMemoryData = await Memory.updateOne({
            _id: memoryData._id
        }, {
            $set: memoryData
        });

        console.log(updateMemoryData);

        res.status(200).json({
            success: true,
            data: updateMemoryData
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            data: error.message
        })
    }

}

const deleteMemory = async (req, res) => {

    try {

        const memoryId = req.params.id;

        await Memory.findByIdAndDelete({ _id: memoryId });
        res.status(200).json({
            success: true,
            msg: `Memory with id ${memoryId} has been deleted`
        })

    } catch (error) {

        res.status(400).json({
            success: false,
            data: error.message
        })
    }


}



module.exports = { getAllMemories, createMemory, likeDislikeMemory, currentUser, deleteMemory, updateMemoryData };