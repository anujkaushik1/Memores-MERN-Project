const Auth = require('../model/auth');

const registerUser = async(req, res) => {
    try {
        const user = await Auth.create(req.body);
        
        sendTokenResponse(user, 200, res);

    } catch (error) {
        res.status(400).json({
            success : false,
        })
    }
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token =  user.generateAuthToken();
    res.status(200).json({
        success : true,
        email : user.email,
        token : token
    })
}

module.exports = {registerUser};