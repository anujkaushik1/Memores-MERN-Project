const JWT = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {

    let token;
    if(req.headers['authorization']){
        const authHeader = req.headers['authorization'];
        if (!authHeader) 
            return res.status(403).json({
                success: false,
                msg: 'Not authorized'
            })
        
        token = authHeader.split(' ')[1];
    }
    
    else if(req.cookies.token){
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(403).json({
            success: false,
            msg: 'Not authorized'
        })
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, msg: err.message })

        req.user = user;

        next();

    })
}