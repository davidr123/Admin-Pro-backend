const {response}= require('express');
const Usuario = require('../models/usuario');
const bcrypt= require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios= async (req, res)=>{
    const desde=Number(req.query.desde) || 0;


//const usuarios=await Usuario.find({}, 'nombre email google')
  //                           .skip(desde)
    //                         .limit(5);



 const [usuarios, total]= await Promise.all([
      Usuario.find({}, 'nombre email google img')
      .skip(desde)
      .limit(5),

      Usuario.countDocuments()
  ]);    

    res.json({
        ok:true,
        usuarios,
        total
    });
}

const CrearUsuarios= async (req, res= response)=>{

    const {nombre, email, password}= req.body;

   

    try{
const existeEmail= await Usuario.findOne({email});
if(existeEmail){
    return res.status(400).json({
        ok:false,
        msg:'El correo ya esta registrado'
    })
}


        const usuario= new Usuario(req.body);


        //Encriptar contraseña
        const alt= bcrypt.genSaltSync();
        usuario.password= bcrypt.hashSync(password, alt);

       

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);
        
            res.json({
                ok:true,
                usuario,
                token
            });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado...'
        });
    }


}

const actualizarUsuario= async(req, res= response)=>{
const uid= req.params.id;
    try{

        const usuarioBD= await Usuario.findById(uid);
        if(!usuarioBD){
            return res.status(404).json({
                ok:false,
                msg:'No existe un usuario por ese id'
            })
        }

        const {password, google, email, ...campos}= req.body;
        if(usuarioBD.email!== email){
            const exixteEmail = await Usuario.findOne({email});
            if(exixteEmail){
              return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un ususario con ese email'
                });
            }
        }

        if(!usuarioBD.google){
            campos.email= email;
        }else if(usuarioBD.email !== email){
return res.status(400).json({
    ok:false,
    msg:'Usuario de google no puede cambiar su correo'
})
        }
       
    
       const actualizarUsuario= await Usuario.findByIdAndUpdate(uid, campos, {new: true});

       

        res.json({
            ok: true,
            usuario: actualizarUsuario
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }

}

const borrarUsuario= async(req, res= response)=>{

const idborrado= req.params.id;

try{

    const usuarioBD = await Usuario.findById(idborrado);

    if(!usuarioBD){
        return res.status(400).json({
           ok:false,
           msg:'Nl exixste ese usuario por id' 
        })
    }

    await Usuario.findOneAndDelete(idborrado);

    res.json({
        ok:true,
        msg:'Usuario Eliminado'
    })
}catch(error){
console.log(error);
res.status(400).json({
    ok:false,
    msg:'Hable con el administrador'
});
}

}


module.exports={
    getUsuarios,
    CrearUsuarios,
    actualizarUsuario,
    borrarUsuario
    
}