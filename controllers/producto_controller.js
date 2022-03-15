const { response } = require('express');
const producto = require('../models/producto');
const Producto = require('../models/producto');



const getProductos= async (req, res)=>{
   


//const usuarios=await Usuario.find({}, 'nombre email google')
  //                           .skip(desde)
    //                         .limit(5);



 const [productos, total]= await Promise.all([
      Producto.find({}, 'descripcion codigo cantidad precio'),
     
      //si usas angular materia no es necesario mandarle valor al limit si no si 

      Producto.countDocuments()
  ]);    

    res.json({
        ok:true,
        productos,
        total
    });
}


const obtenerProductoById=async(req, res=response)=>{

    const id= req.params.id;

    try {

        const productosDB= await Producto.findById(id)
 

    res.json({
        ok:true,
        productosDB
    });

        
    } catch (error) {
          console.log(error);
        res.json({
            ok:false,
            msg:'Hable con el administrador'
        });
    
        
    }

    


}




    const crearProducto = async(req, res = response) => {

        const uid = req.uid;
        const producto = new Producto({ 
            usuario: uid,
            ...req.body 
        });
    
        try {
            
            const productoDB = await producto.save()
            
    
            res.json({
                ok: true,
                producto: productoDB
            });
    
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            });
        }
        
    
    
    }


    const borrarProducto = async(req, res = response) => {
        const id = req.params.id;
    
        try{
    
            const producto = await Producto.findById(id);
            if(!producto){
               return res.status(404).json({
                    ok:true,
                    msg:'Producto no encontrado por id '
                });
            }
           
         
    
          await Producto.findByIdAndDelete( id );
    
    
    
            res.json({
                ok: true,
                msg: 'Producto Borrado con exito',
               
            });
    
        }catch(err){
            res.status(500).json({
                ok:false,
                msg:'Hable con el administrador'
            });
        }
    
    
    
    }
    

    module.exports={
        getProductos,
        crearProducto,
        obtenerProductoById,
        borrarProducto
    }