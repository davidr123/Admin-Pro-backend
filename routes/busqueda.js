const {Router}= require('express');
const { check } = require('express-validator');
const { getBusqueda, getTablaCollecion } = require('../controllers/busqueda_controllers');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:busqueda', 

    validarJWT,

getBusqueda)


router.get('/coleccion/:tabla/:busqueda', 

    validarJWT,

    getTablaCollecion)


module.exports= router;