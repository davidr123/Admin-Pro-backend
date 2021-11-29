const {Router}= require('express');
const { check } = require('express-validator');
const {login, gooleSingin}= require('../controllers/auth_controller');
const {validarCampos} = require('../middlewares/validar-campos')
const router= Router();

router.post('/', 
[
check('email', 'El campo email es obligatorio').isEmail(),
check('password', 'El campo password es obligatorio').not().isEmpty(),
validarCampos,
], 
login);

router.post('/google', 
[

check('token', 'El token  de google es obligatorio').not().isEmpty(),
validarCampos,
], 
gooleSingin);


module.exports= router;
