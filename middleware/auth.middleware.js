const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
// this function let you to check if token is ok and put user who is correspond in response
module.exports.checkUser=(req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET, async(err,decodedToken)=>{
            if(err){
                res.locals.user =null;
                res.cookie('jwt','',{maxAge:1});
                 next();

            }else{
                const user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }else{
        res.locals.user =null;
        next();
    }
};
//this function let you to get user who is conncted id
module.exports.requireAuth=(req,res,next)=>{
    
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,  async(err,decodedToken)=>{
            if(err) {
                console.log(err);
                res.send(200).json('no token');
            }else{
                console.log(decodedToken.id);
                next();
            }
        })
    }else{
        console.log('no-token ');
        next();
    }

}