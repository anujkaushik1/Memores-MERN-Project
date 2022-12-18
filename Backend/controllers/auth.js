const Auth = require('../model/auth');

const registerUser = async(req, res) => {
    console.log(req.body);
    res.status(200).json({msg : 'success'})
}

module.exports = {registerUser};