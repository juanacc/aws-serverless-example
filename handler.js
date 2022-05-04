'use strict';

const {v4} = require('uuid');

// event: Objeto de evento. El disparador lo envia a AWS Lambda. Tiene toda la informacion sobre el disparador
// context: Objeto de contexto. Contexto de ejecucion de AWS Lambda
// callback: Funcion de callback. Es la funcion que se ejecuta cuando termina la ejecucion de la funcion. Es opcional y sirve para devolver una respuesta al disparador
module.exports.hacerPedido = async (event, context, callback) => {
  const orderId = v4();
  // si en la consola ejecutamos sls logs -f hacerPedido -t, veremos el console log al hacer el post desde postman
  console.log('Hacer pedido');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `El pedido fue registrado con el numero de orden ${orderId}`,
      },
      null,
      2
    ),
  };
};
