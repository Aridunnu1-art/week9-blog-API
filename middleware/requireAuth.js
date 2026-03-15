require('dotenv').config();
const jwt = require('jsonwebtoken');

const requireAuth =(req, res, next)=>{
    const AuthHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json("No token")
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json('Invalid token');
        
    }
};
module.exports = requireAuth;