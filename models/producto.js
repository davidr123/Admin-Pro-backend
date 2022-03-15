const {Schema, model}= require('mongoose');
const mongoose= require('mongoose');

const ProductoSchema = Schema({

    descripcion:{
        type:String,
        required: true
    },

    codigo:{
        type:String,
        required: true
    },
    

    cantidad:{
        type: Number,
        required: true
    },

    
    precio:{
        type: Number,
        required: true
    },

 
  

    
    

});

ProductoSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports= model('Producto', ProductoSchema);