const {Schema, model}= require('mongoose');
const mongoose= require('mongoose');
const producto = require('./producto');

const UsuarioPedidoSchema = Schema({
    nombre:{
        type:String,
        required: true
    },

    apellido:{
        type:String,
    
    },

    identificacion:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
 
    img:{
        type:String,
        
    },
    genero:{
        type:String,
      
    },

    direccion:{
        type:String,
       
       
    },



});


UsuarioPedidoSchema.method('toJSON', function(){
    const {__v, ...object}= this.toObject();
return object;

})

module.exports= model('UsuarioPedido', UsuarioPedidoSchema);