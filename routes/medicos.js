const {Router}= require('express');
const { check } = require('express-validator');
const { getmedico, crearmedico, actualizarmedico, borrarmedico, obtenerMedicoById } = require('../controllers/medico_controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router= Router();


router.get('/', validarJWT, getmedico );

router.post('/', 
[
    validarJWT,
    check('nombre', 'el campo nombre es obligatorio').not().isEmpty(),
    check('hospitales', 'el campo id de hospita es invalido').isMongoId(),
    validarCampos
],
 crearmedico);

router.put('/:id',

[
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    check('hospitales', 'el campo id de hospita es invalido').isMongoId(),
    validarCampos
],

actualizarmedico);

router.delete('/:id',validarJWT, borrarmedico);

router.get('/:id',validarJWT, obtenerMedicoById);

module.exports= router;



