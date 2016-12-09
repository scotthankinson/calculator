'use strict';
import utils = require("../lib/utils");

export function subtraction(event : any, context : any, callback : any) : any
{
  let request = utils.tryParseJSON(event.body);
  
  if (request === false){
    return callback(null, utils.createResponseObject(400, {'message': '[400] Error!  invalid request body!'}));
  }
  

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your subtract function executed successfully!',
      input: request,
      output: request.a - request.b,
    }),
  };

  callback(null, response);
};