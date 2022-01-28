const { response } = require("express");
const jwt= require('jsonwebtoken');
const usuario = require("../models/usuario");
 const Usuario = require('../models/usuario');

const validarJWT= (req, res= response, next)=>{

    const token= req.header('x-token');
    
    if(!token){
        res.status(401).json({
            ok:false,
            msg:'no hay token de peticion'
        })
    }
    try{

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid= uid;
        next();
    }catch(error){
       return res.status(401).json({
            ok:false,
            msg:'token no valido'
        });
    }
   


    
}



const AdminRole= async(req, res=response, next)=>{

    const uid= req.uid;
    const id= req.params.id;

    try {

      const usuarioDb= await Usuario.findById(uid);

      if(!usuarioDb){
          res.status(404).json({
              ok:false,
              msg:'El usuario no existe'
          });
      }

      if(usuarioDb.role === 'ADMIN_ROLE' || uid===id){

        next();
     
      }else{

        res.status(403).json({
            ok:false,
            msg:'El usuario no tiene este privilegio'
        });

      }

     
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }


}



module.exports={
    validarJWT,
    AdminRole
}



