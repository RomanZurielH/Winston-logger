// Modulo de Express
const express = require('express');

// Requerimiento de Logger.js
const logger = require('./Utils/logger');
const app = express();
const port = 3000;
const host = "localhost";

// Llamando Express
app.get('/',(req,res) => {
    res.send("Esto es una prueba 😎 con logger en winston");
    logger.info("Servidor enviando mensaje!");
})

// Presentando error usando 
// una variable indefinida
app.get('/calc',(req,res) => {
    const x = y + 10;
    res.send(x.toString());
})

// Catch del error 500 
app.use((err,req,res,next) => {
res.status(500).send('El cálculo no se pudo realizar!');
   logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Catch de los errores 404 
app.use((req,res,next) => {
    res.status(404).send("Página no encontrada");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})
// Servidor en ejecucion
app.listen(port, () => {
    console.log("Servidor ejecutandose...");
    logger.info(`Servidor ejecutandose en http://${host}:${port}`)
})