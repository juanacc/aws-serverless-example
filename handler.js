'use strict';

// event: Objeto de evento. El disparador lo envia a AWS Lambda. Tiene toda la informacion sobre el disparador
// context: Objeto de contexto. Contexto de ejecucion de AWS Lambda
// callback: Funcion de callback. Es la funcion que se ejecuta cuando termina la ejecucion de la funcion. Es opcional y sirve para devolver una respuesta al disparador
module.exports.hello = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola mundo!',
        input: event,
      },
      null,
      2
    ),
  };
};
