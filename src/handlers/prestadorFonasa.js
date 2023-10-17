const APIError = require('../utils/error');
const { validateAtendedor } = require('../schemas/validate');


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
const getToken = async () => {
    try {
        const url= "https://fonasa.custhelp.com/cc/WSMisCasos/validarAuth"; 
        const body = {user : "prestadorBupa", password: "jS8DIoLp34VX"}        
        responseOP = await axios.post(url, body);         
        return responseOP.data.response.jwt;        
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