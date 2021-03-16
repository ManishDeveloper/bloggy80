const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req,res,next) {
    let token = req.header('x-auth-token');

    //check token
    if(!token){
        return res.status(401).json({error:'No Token, Authorization Denied!'})
    }

    try {
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).json({error:'Token is not Valid!'});
            }else {
                req.user = decoded.user;
                next();
            }

        })
        
    } catch (error) {
        console.log('something wrong with middleware.')
        return res.status(500).json({error:'Server Error.'})
    }
    
}