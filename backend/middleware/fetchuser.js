const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Thisisvijay@83020'

const fetchUser = (req,res,next)=>{
    //get the user from the jwttoken and id to req object
    const Token = req.header('auth-token')//header ka name auth-token
    if(!Token){
        res.status(401).send({error:'Please authenticat using a valid token'})
    }
    try{
        const data = jwt.verify(Token,JWT_SECRET);//to verify token
        // console.log(data)
        req.user = data.user;
        next();
    }catch(err){
        res.status(401).send({error:'Please authenticat using a valid token'})
    }
}

module.exports = fetchUser;