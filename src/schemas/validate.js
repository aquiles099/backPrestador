const operationName = '[validateAlmacenaAtendedorSchemas]';
const functionName = 'VAT';

const mensaje = {
    inicio: '-----------[ VALIDATION - Inicio validación del id de Proceso ]-----------',
    termino: '-----------[ VALIDATION - Termina validación del id de Proceso ]-----------'
}

const validacion = {    
    idProcesoValido(eventBody) {
        let body;
        try {
            body = JSON.parse(eventBody);
        } catch (error) {
          //  logError.handleError(APP_TYPE_LOG.ERROR_BODY_NO_VALID);
        }
    
       // logError.logInfo('body' + eventBody);
        return body;
    },  

};

const validateIdProceso = async (event) => {
    //logError.logInfo(mensaje.inicio);

    try {
        validacion.idProcesoValido(event.body);
        const body = validacion.cuerpoValido(event.body);

      //  logError.logInfo(mensaje.termino);
        return body;
    } catch (error) {
        //logError.logError(JSON.stringify(error));
        throw error;
    }
};

module.exports = { validateIdProceso };