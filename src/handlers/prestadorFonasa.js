const APIError = require('../utils/error');
const { validateAtendedor } = require('../schemas/validate');
const moment = require('moment');
const fs = require('fs');

const axios = require('axios');

const INFO_RESPONSE = Object.freeze({
    SUCCESS_CODE: 200,
    ERROR_CODE: 500,
    GENERIC_MSJ: 'ERROR DESCONOCIDO',
    GENERIC_CODE: '9999'
});

/**
 * Obtiene el detalle 
 * @param {*} idProceso 
 * @returns 
 */
exports.obtenerDetalle = async (idProceso) => {
    try {
        const token = await getToken();          
        const url= "https://fonasa.custhelp.com/cc/WSMisCasos/obtenerDetalle/proceso/" + idProceso;      
        responseOP = await axios.get(url, {headers: {jwt:token}});   
        return {
            statusCode: INFO_RESPONSE.SUCCESS_CODE,
            body: JSON.stringify(responseOP.data)
        };
    } catch (e) {
        let mensaje = undefined;
        let codigo = undefined;

        if (e instanceof APIError) {
            mensaje = e.msg;
            codigo = e.code;
        } else {
            mensaje = INFO_RESPONSE.GENERIC_MSJ;
            codigo = INFO_RESPONSE.GENERIC_CODE;
        }


        return {
            statusCode: INFO_RESPONSE.ERROR_CODE,
            body: JSON.stringify({
                code: `API.${codigo}`,
                message: mensaje,
                data: null,
            })
        };
    }
};

/**
 * Obtiene el detalle del historial
 * @param {*} idProceso 
 * @returns 
 */
exports.obtenerHistorial = async (idProceso) => { 
    try {
        const token = await getToken();          
        const url= "https://fonasa.custhelp.com/cc/WSHistorial/obtenerDetalle/proceso/" + idProceso;      
        responseOP = await axios.get(url, {headers: {jwt:token}});   
        return {
            statusCode: INFO_RESPONSE.SUCCESS_CODE,
            body: JSON.stringify(responseOP.data)
        };
    } catch (e) {
        let mensaje = undefined;
        let codigo = undefined;

        if (e instanceof APIError) {
            mensaje = e.msg;
            codigo = e.code;
        } else {
            mensaje = INFO_RESPONSE.GENERIC_MSJ;
            codigo = INFO_RESPONSE.GENERIC_CODE;
        }


        return {
            statusCode: INFO_RESPONSE.ERROR_CODE,
            body: JSON.stringify({
                code: `API.${codigo}`,
                message: mensaje,
                data: null,
            })
        };
    }
};

/**
 * Obtiene el token desde un arhivo o se solicita por el api 
 * @returns 
 */
const getToken = async () => {
    try {
        let responseOP;        
        const filePath = './datos.json'; 
        let tokenData;
        const jsonContent = fs.readFileSync(filePath, 'utf-8');        
        const jsonDataToken = JSON.parse(jsonContent);        
        let fechaAnterior = moment(jsonDataToken.fechaCreacion); 
        let fechaActual = moment(); 
        const minutosDiferencia = fechaActual.diff(fechaAnterior, 'minutes');

        if(minutosDiferencia > 5) {
            console.log('dentro del if');
            const url= "https://fonasa.custhelp.com/cc/WSMisCasos/validarAuth"; 
            const body = {user : "prestadorBupa", password: "jS8DIoLp34VX"}        
            responseOP = await axios.post(url, body);  
            tokenData = {
                token:  responseOP.data.response.jwt,
                fechaCreacion: moment().format()
            };
            const jsonData = JSON.stringify(tokenData);
            fs.writeFileSync(filePath, jsonData);
        }else{
            tokenData = jsonDataToken
        }

        return tokenData.token;        
    } catch (e) {
        let mensaje = undefined;
        let codigo = undefined;

        if (e instanceof APIError) {
            mensaje = e.msg;
            codigo = e.code;
        } else {
            mensaje = INFO_RESPONSE.GENERIC_MSJ;
            codigo = INFO_RESPONSE.GENERIC_CODE;
        }

        return {
            statusCode: INFO_RESPONSE.ERROR_CODE,
            body: JSON.stringify({
                code: `API.${codigo}`,
                message: mensaje,
                data: null,
            })
        };
    }

}