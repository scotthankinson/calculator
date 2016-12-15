'use strict';
import utils = require("../lib/utils");

export function division(event : any, context : any, callback : any) : any
{
  console.log('received request: ' + event.body);
  let request = utils.tryParseJSON(event.body);
  
  if (request === false){
    console.log('invalid request format provided');
    return callback(null, utils.createResponseObject(400, {'message': '[400] Error!  invalid request body!'}));
  }
  
  const response = {
      message: 'Go Serverless v1.0! Your divide function executed successfully!',
      input: request,
      output: request.a / request.b,
  };

  callback(null, utils.createResponseObject(200, response));
};