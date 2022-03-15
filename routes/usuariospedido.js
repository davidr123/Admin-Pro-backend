const {Router}= require('express');
const {getUsuariosPedido,CrearUsuariosPedido} = require('../controllers/usuario_pedido.controller');
const {check}= require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');



const router= Router();

router.get('/', getUsuariosPedido);


router.post('/', 
[
    check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El campo apellido es obligatorio').not().isEmpty(),
    check('identificacion', 'El campo identificacion es obligatorio').not().isEmpty(),
    check('email', 'El campo email es obligatorio').isEmail(),
     check('direccion', 'El campo direccion es obligatorio').not().isEmpty(),
    check('genero', 'El campo genero es obligatorio').not().isEmpty(),
   
   
    validarCampos,
],
CrearUsuariosPedido
);


module.exports= router;