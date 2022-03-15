const {response}= require('express');
const UsuarioPedido = require('../models/usuariopedido');



const getUsuariosPedido= async (req, res)=>{
    const desde=Number(req.query.desde) || 0;


//const usuarios=await Usuario.find({}, 'nombre email google')
  //                           .skip(desde)
    //                         .limit(5);



 const [usuariospedido, total]= await Promise.all([
      UsuarioPedido.find({}, 'nombre apellido email identificacion img direccion genero producto')
      .populate('producto', 'descripcion codigo cantidad precio')
      .skip(desde)
      .limit(),
      //si usas angular materia no es necesario mandarle valor al limit si no si 

      UsuarioPedido.countDocuments()
  ]);    

    res.json({
        ok:true,
        usuariospedido,
        total
    });
}




const CrearUsuariosPedido= async(req, res=response)=>{

    const uid= req.uid;
        const usuariopedido= new UsuarioPedido({
    usuariopedido:uid,
        ...req.body});
    
    
        try{
    const usuariopedidoDB= await usuariopedido.save();
    res.json({
        ok:true,
        usuariopedido:usuariopedidoDB
    });
    
    
    
        }catch(error){
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Hable con el administrador'
            });
        }
    
      
        
    
    }


module.exports={
    getUsuariosPedido,
    CrearUsuariosPedido
    
}
