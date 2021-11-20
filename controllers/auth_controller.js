const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt= require('bcryptjs');
const { validarCampos } = require("../middlewares/validar-campos");
const { generarJWT } = require("../helpers/jwt");


const login = async(req, res= response)=>{

    const {email, password}= req.body;

    try{

     const usuarioDb= await Usuario.findOne({email});

     if(!usuarioDb){
         return res.status(404).json({
             ok:false,
             msg:'Email no valida'
         });
     }

     //verificar contraseña

     const validPasssword= bcrypt.compareSync(password, usuarioDb.password);

if(!validPasssword){
    return res.status(400).json({
        ok:false,
        msg:'Contraseña no valida'
    });
}

//Generar Token

const token = await generarJWT(usuarioDb.id);

        res.json({
            ok:true,
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports={
    login
}