const jwt=require("jsonwebtoken");
const dotenv=require('dotenv');
const { error } = require("../utils/Utils");
const User = require("../model/User");

module.exports= async(req,res,next) =>{
    if(!req.headers  || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        return res.status(401).send("Authorization header is required");
    }

    const accessToken=req.headers.authorization.split(" ")[1];
    

    try {
        const decode=jwt.verify(accessToken,process.env.ACCESS_TOKEN_PRIVATE);
        req._id=decode._id;

        const user=await User.findById(req._id);
        if(!user){
            return res.send(error(404,"user is not available"));
        }
        next();


    } catch (e) {
        // console.log(e);
        // return res.status(401).send("invalid access key");
        return res.send(error(401,'invalid acces key'))
    }
    // next();
};