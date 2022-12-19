const Auth = require('../model/auth');

const registerUser = async(req, res) => {
    try {
        const user = await Auth.create(req.body);
        
        return res.status(200).json({
            success : true,
            data : user.email
        })

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
            console.log(1);
            return res.status(401).json({success : false, msg : 'Invalid Credentials'}); 
        }
        const isMatch = await user.matchPassword(password);
        console.log(isMatch);
        if(!isMatch){
            console.log(2);
            return res.status(401).json({success : false, msg : 'Invalid Credentials'});
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        console.log(3);
        return res.status(400).json({
            success : false,
        })
    }
}

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token =  user.generateAuthToken();

    const options = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpsOnly : true
    }

    return res.status(statusCode).cookie("token", token, options).json({
        success : true,
        token : token
    })
}

module.exports = {registerUser, loginUser};