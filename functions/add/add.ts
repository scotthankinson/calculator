'use strict';
import utils = require("../lib/utils");

export function addition(event : any, context : any, callback : any) : void 
{
  let request = utils.tryParseJSON(event.body);
  
  if (request === false){
    return callback(null, utils.createResponseObject(400, {'message': '[400] Error!  invalid request body!'}));
  }
  
  if (typeof request.a === 'undefined' || typeof request.b === 'undefined')
    return callback(null, utils.createResponseObject(400, {'message': '[400] Error!  arguments a and b are required!'}));

  if (typeof request.a !== 'number' || typeof request.b !== 'number') 
    return callback(null, utils.createResponseObject(400, {message: '[400] Error!  arguments a and b must be numbers!'}));

  const response = {
      message: 'Go Serverless v1.0! Your add function executed successfully!',
      input: request,
      output: request.a + request.b,
    };

  return callback(null, utils.createResponseObject(200, response));
};