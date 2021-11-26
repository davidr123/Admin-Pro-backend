const { response } = require("express");
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');




const getTablaCollecion= async( req, res= response)=>{
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp= new RegExp(busqueda, 'i');

    let data=[];

  switch(tabla){
      case 'medicos':
         data = await Medico.find({nombre:regexp}).populate('usuario', 'nombre, img')
         .populate('hospitales', 'nombre, img')
   break;
        
          case 'hospitales':
            data = await Hospital.find({nombre:regexp})
            .populate('usuario', 'nombre, img');
          break;
          case 'usuarios':
            data = await Usuario.find({nombre:regexp});
          break;
          default:
            return  res.status(400).json({
                  ok:false,
                  msg:'La tabla tiene que ser usuarios/hospitales/medicos'
              });
         
  }

  res.json({
    ok:true,
    resultados:data
});


}



const getBusqueda=async(req, res= response)=>{


try{

    
    const busqueda = req.params.busqueda;
    const regexp= new RegExp(busqueda, 'i');

    

const [usuarios, medicos, hospitales]= await Promise.all([
    Usuario.find({nombre:regexp}),
    Medico.find({nombre:regexp}),
    Hospital.find({nombre:regexp}),


]);
  

    res.json({
        ok:true,
        msg:'getTodo',
        usuarios,
        medicos,
        hospitales
    });

}catch(error){
    res.status(500).json({
        ok:false,
        msg:'Hable con el admin'
    });
}

  

}

module.exports={
    getBusqueda,
    getTablaCollecion
}