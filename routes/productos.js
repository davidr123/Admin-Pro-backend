
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
    obtenerProductoById,
    borrarProducto
}= require('../controllers/producto_controller')

const router = Router();

router.get( '/', validarJWT,  getProductos );



router.post( '/',
[
    validarJWT,
    check('descripcion','La descripcion del producto es necesario').not().isEmpty(),
    check('codigo','El codigo del producto es necesario').not().isEmpty(),
    check('precio','El precio del producto es necesario').not().isEmpty(),
    validarCampos
], 
crearProducto 
);

router.get('/:id',validarJWT, obtenerProductoById);

router.delete( '/:id',


    validarJWT,

    borrarProducto
);


module.exports = router;