const {Router}= require('express');
const { check } = require('express-validator');
const { getBusqueda, getTablaCollecion, getBusquedabyProducto } = require('../controllers/busqueda_controllers');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:busqueda', 

    validarJWT,

getBusqueda)


//BUSQUEDAPRODUCTO

router.get('/productos/:busquedaproducto', 

    validarJWT,

getBusquedabyProducto)

///////


router.get('/coleccion/:tabla/:busqueda', 

    validarJWT,

    getTablaCollecion)


module.exports= router;