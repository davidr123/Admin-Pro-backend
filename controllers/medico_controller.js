const {Router, response}= require('express');

const Medico= require('../models/medico');

const getmedico=async(req, res=response)=>{

    const medicosDB= await Medico.find().populate('usuario', 'nombre').populate('hospitales', 'nombre');

    res.json({
        ok:true,
        medicosDB
    });



}


const crearmedico= async(req, res=response)=>{

const uid= req.uid;
    const medico= new Medico({
usuario:uid,
    ...req.body});


    try{
const medicoDB= await medico.save();
res.json({
    ok:true,
    medico:medicoDB
});



    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

  
    

}

const actualizarmedico=(req, res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarMedicos'
    });

    

}

const borrarmedico=(req, res=response)=>{

    res.json({
        ok:true,
        msg:'borrarMedicos'
    });

    

}

module.exports={
    getmedico,
    crearmedico,
    actualizarmedico,
    borrarmedico

}