const {Router}= require('express');
const { check } = require('express-validator');
const { getmedico, crearmedico, actualizarmedico, borrarmedico } = require('../controllers/medico_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router= Router();


router.get('/', getmedico );

router.post('/', 
[
    validarJWT,
    check('nombre', 'el campo nombre es obligatorio').not().isEmpty(),
    check('hospitales', 'el campo id de hospita es invalido').isMongoId(),
    validarCampos
],
 crearmedico);

router.put('/:id', actualizarmedico);

router.delete('/:id', borrarmedico);

module.exports= router;



