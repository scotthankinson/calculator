'use strict';
import utils = require("../lib/utils");

export function division(event : any, context : any, callback : any) : any
{
  console.log('received request: ' + event.body);
  let request = utils.tryParseJSON(event.body);
  
  if (request === false){
    console.log('invalid request format provided');
    return callback(null, utils.createResponseObject(400, {'message': '[400] Error! Invalid request body!'}));
  }

  if (typeof request.a !== 'number' || typeof request.b !== 'number') 
    return callback(null, utils.createResponseObject(400, {message: '[400] Error! a and be must be numbers!'}));

  if (typeof request.a !== 'number' || typeof request.b !== 'number') 
    return callback(null, utils.createResponseObject(400, {message: '[400] Error!  arguments a and b must be numbers!'}));

  const response = {
      message: 'Go Serverless v1.0! Your divide function executed successfully!',
      input: request,
      output: request.a / request.b,
  };

  callback(null, utils.createResponseObject(200, response));
};