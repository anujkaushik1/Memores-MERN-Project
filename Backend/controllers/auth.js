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

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Auth.findOne({email : email});
        
        if(!user){
            return res.status(401).json({success : false, msg : 'Invalid Credentials'}); 
        }

        
        const isMatch = await user.matchPassword(password);
        console.log(isMatch);
        if(!isMatch){
            res.status(401).json({success : false, msg : 'Invalid Credentials'});
        }

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
    res.status(statusCode).json({
        success : true,
        email : user.email,
        token : token
    })
}

module.exports = {registerUser, loginUser};