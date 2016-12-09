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

        if (typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};