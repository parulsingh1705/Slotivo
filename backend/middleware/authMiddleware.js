const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.json({message : "No token provided"});
    }
    try{
        const decoded = jwt.verify(token, "secretkey");

        req.doctorId = decoded.doctorId;
        next();

    }catch(error){
        res.json({message : "Invalid token"});
    }
};

module.exports = authMiddleware;