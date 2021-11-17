require('dotenv').config();
const express= require('express');
const cors= require('cors');
const {dbConnection}= require('./database/config');

// crear servidor
const app = express();

//Configurar CORS
app.use(cors());

//base de dtos
dbConnection();

// User:mean_freddy
//password: Nd5GvPsEyPKhlN8D


//RUTAS
app.get('/', (req, res)=>{
    res.json({
        ok:true,
        msg: 'Hola Freddy'
    })
})

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto ' );
})