const {Router}= require('express');
const {getUsuarios, CrearUsuarios, actualizarUsuario, borrarUsuario} = require('../controllers/usuarios_contoller');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
const { validarJWT, AdminRole } = require('../middlewares/validar-jwt');


const router= Router();


router.get('/', validarJWT, getUsuarios);
router.post('/', 
[
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
    validarCampos,
],
CrearUsuarios
);

router.put('/:id', 
[   
    validarJWT,
    AdminRole,
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
    check('role', 'El campo role es obligatorio').not().isEmpty(),
], 
actualizarUsuario);


router.delete('/:id',validarJWT, borrarUsuario );



module.exports= router;
