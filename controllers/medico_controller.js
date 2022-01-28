const {Router, response}= require('express');

const Medico= require('../models/medico');

const getmedico=async(req, res=response)=>{

    const medicosDB= await Medico.find().populate('usuario', 'nombre').populate('hospitales', 'nombre');

    res.json({
        ok:true,
        medicosDB
    });



}

const obtenerMedicoById=async(req, res=response)=>{

    const id= req.params.id;

    try {

        const medicosDB= await Medico.findById(id)
    .populate('usuario', 'nombre')
    .populate('hospitales', 'nombre');

    res.json({
        ok:true,
        medicosDB
    });

        
    } catch (error) {
          console.log(error);
        res.json({
            ok:false,
            msg:'Hable con el administrador'
        });
    
        
    }

    


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
        });
    }

  
    

}

const actualizarmedico=async(req, res=response)=>{

    const id = req.params.id;
    const uid= req.uid
        try{
    
            const medico = await Medico.findById(id);
            if(!medico){
               return res.status(400).json({
                    ok:true,
                    msg:'Medico no encontrado por id '
                });
            }
           
            const cambiosMedico={
                ...req.body,
                usuario:uid
            }
    
            const medicoActualizado= await Medico.findByIdAndUpdate(id, cambiosMedico,{new: true});
    
    
    
            res.json({
                ok: true,
                 medico:medicoActualizado
            });
    
        }catch(err){
            res.status(500).json({
                ok:false,
                msg:'Hable con el administrador'
            });
        }
}




const borrarmedico=async(req, res=response)=>{

    const id= req.params.id;
    const uid= req.uid;


    try{

        const medico = await Medico.findById(id);

    if(!medico){
        return res.json({
            ok:true,
            msg:'Medico no encontrado por id'
        });

    }

   

await Medico.findByIdAndDelete(id);

    res.json({
        ok:true,
        msg:'Medico Borrado'
    });


    }catch(err){
        res.status(500).json({
            ok:false,
            msg:'Hable con el administador'
        })
    }

    

    

}

module.exports={
    getmedico,
    crearmedico,
    actualizarmedico,
    borrarmedico,
    obtenerMedicoById

}