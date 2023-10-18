const express = require('express');
const prestadorFonasa = require('../handlers/prestadorFonasa');
const cors = require('cors'); 
const app = express();

app.use(express.json());
app.use(cors());


//healthcheck
const healthcheckEndpoint = function (req, res) {
    const response = { status: '00', message: 'Service OK' };
    res.status(200).json(response);
};

// Obtiene detalle prestador
const prestadorFonasaDetalleEndpoint = async function (req, res) {    
    const idProceso = req.params.id;
    const result = await prestadorFonasa.obtenerDetalle(idProceso);
    res.status(result.statusCode).json(JSON.parse(result.body));
};

// Obtiene Historial prestador
const prestadorFonasaHistorialEndpoint = async function (req, res) {
    const idProceso = req.params.id;
    const result = await prestadorFonasa.obtenerHistorial(idProceso);
    res.status(200).json(JSON.parse(result.body));
};


app.get(`/healthcheck`, healthcheckEndpoint);

app.get('/obtenerDetalle/:id', prestadorFonasaDetalleEndpoint);

app.get('/ObtenerHistorial/:id',prestadorFonasaHistorialEndpoint);

const main = () => {
    app.listen(8000, '0.0.0.0');
};

module.exports = {
    main,
    healthcheckEndpoint,
    prestadorFonasaDetalleEndpoint,
    prestadorFonasaHistorialEndpoint
};