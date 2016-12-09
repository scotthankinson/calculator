'use strict';
import utils = require("../lib/utils");

export function createResponseObject(statusCode : number, body : any) : any 
{
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };

  return response;
};

export function tryParseJSON (jsonString : string) : any {
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};