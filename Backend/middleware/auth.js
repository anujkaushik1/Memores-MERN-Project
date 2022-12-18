const JWT = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: 'Not authorized'
        })
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({success : false, msg : err.message})

        req.user = user;

        next();

    })
}