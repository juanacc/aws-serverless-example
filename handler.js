'use strict';

const AWS = require('aws-sdk'); //a esta biblioteca no la tenemos que instalar dado que esta instalada en todas las lambdas por defecto
const {v4} = require('uuid');

const sqs = new AWS.SQS({region: process.env.REGION}); //creo una variable que lo que hace es llamar al modulo de SQS en la libreria de AWS
const QUEUE_URL = process.env.PENDING_ORDER_QUEUE; // esta variable es la url de la queue

// event: Objeto de evento. El disparador lo envia a AWS Lambda. Tiene toda la informacion sobre el disparador
// context: Objeto de contexto. Contexto de ejecucion de AWS Lambda
// callback: Funcion de callback. Es la funcion que se ejecuta cuando termina la ejecucion de la funcion. Es opcional y sirve para devolver una respuesta al disparador
module.exports.hacerPedido = (event, context, callback) => {
  
  // si en la consola ejecutamos sls logs -f hacerPedido -t, veremos el console log al hacer el post desde postman
  console.log('Hacer pedido');
  
  const orderId = v4();
  
  // creo un objeto de mensaje para enviar a la cola
  const params = {
    MessageBody: JSON.stringify({orderId}),
    QueueUrl: QUEUE_URL
  }

  sqs.sendMessage(params, (err, data) => {
    if(err){
      sendResponse(500, err, callback);
    }
    else{
      const message = {
        orderId,
        messageId: data.MessageId //id del mensaje que se envio a la cola
      }
  
      sendResponse(200, message, callback);
    }
    
  });
};

const sendResponse = (statusCode, message, callback) => {
  const response = {
    statusCode,
    body: JSON.stringify(message)
  };
  callback(null, response);
}
