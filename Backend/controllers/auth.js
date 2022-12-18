const Auth = require('../model/auth');

const registerUser = async(req, res) => {
    try {
        const user = await Auth.create(req.body);
        res.status(200).json({
            success : true,
            data : user
        })
    } catch (error) {
        res.status(400).json({
            success : false,
        })
    }
}

module.exports = {registerUser};