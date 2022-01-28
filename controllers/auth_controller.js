const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt= require('bcryptjs');
const { validarCampos } = require("../middlewares/validar-campos");
const { generarJWT } = require("../helpers/jwt");
const { veryGoogle } = require("../helpers/google-verify");
const usuario = require("../models/usuario");
const { menuFrontend } = require("../helpers/menu-frontend");


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
            token,
            menu:menuFrontend(usuarioDb.role)
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}


const gooleSingin= async(req, res= response)=>{

    const GoogleToken= req.body.token;

    try{
        const{name, email, picture} =  await  veryGoogle(GoogleToken);

      const UsuarioDB= await Usuario.findOne({email});

        let usuario;

        if(!UsuarioDB){
            usuario= new Usuario({
nombre: name,
email,
img:picture,
password:'@@@',
google:true

            });
        }else{
            usuario= UsuarioDB;
            usuario.google= true;

        }

      await usuario.save();
        //generar JWT
        const token = await generarJWT(usuario.id);
   
        res.json({
            ok:true,
            token,
            menu:menuFrontend(usuario.role)
        });

    }catch(error){
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:'Token no es correcto'
        })
    }

    
}


const renewToken=async(req, res= response)=>{

const uid = req.uid
 //generar JWT
 const token = await generarJWT(uid);

 //Obtenr el usuario por UID

 const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        token,
        usuario,
        menu:menuFrontend(usuario.role)
    })
}

module.exports={
    login,
    gooleSingin,
    renewToken
}