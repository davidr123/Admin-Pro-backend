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


//RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));




app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto ' );
})