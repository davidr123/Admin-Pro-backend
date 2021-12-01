const {Router}= require('express');
const { check } = require('express-validator');
const {login, gooleSingin, renewToken}= require('../controllers/auth_controller');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
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

router.get('/renew', 
validarJWT,
renewToken);


module.exports= router;
