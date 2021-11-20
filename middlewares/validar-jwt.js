const { response } = require("express");
const jwt= require('jsonwebtoken')

const validarJWT= (req, res= response, next)=>{

    const token= req.header('x-token');
    
    if(!token){
        res.status(401).json({
            ok:false,
            msg:'no hay token de peticion'
        })
    }
    try{

        const uid = jwt.verify(token, process.env.JWT_SECRET);

        req.uid= uid;
        next();
    }catch(error){
        res.json({
            ok:false,
            msg:'token no valido'
        })
    }
   


    
}

module.exports={
    validarJWT
}