require('dotenv').config();
const express= require('express');
const cors= require('cors');
const {dbConnection}= require('./database/config');

// crear servidor
const app = express();

//Configurar CORS
app.use(cors());

//Lectura de parseo del body
app.use(express.json());

//base de dtos
dbConnection();

// User:mean_freddy
//password: Nd5GvPsEyPKhlN8D

//Directorio publico
app.use(express.static('public'));

//RUTAS
app.use('/api/upload', require('./routes/upload'));
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto ' );
})