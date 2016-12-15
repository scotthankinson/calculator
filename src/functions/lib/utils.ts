'use strict';
import utils = require("../lib/utils");

export function createResponseObject(statusCode : number, body : any) : any 
{
  const response = {
    statusCode: statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(body),
  };

  console.log('assembled response: ' + JSON.stringify(response));
  return response;
};

export function tryParseJSON (jsonString : string) : any {
    try {
        var o = JSON.parse(jsonString);

        if (typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

export function whatDoIDo(jsonString: string) : boolean {
    let request = tryParseJSON(jsonString);
    let hasA = false;
    let hasB = false;
    
    if (request === false)
        return false;
        
    if (typeof request.a !== 'undefined'){
        if (typeof request.a === 'number'){
            hasA = true;
        }
    }
        
    if (typeof request.b !== 'undefined'){
        if (typeof request.b === 'number'){
            hasB = true;
        }
    }

    return hasA && hasB;
}