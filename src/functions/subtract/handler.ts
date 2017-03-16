import path = require("path");
require("app-module-path").addPath("." + path.sep + "build");

import { createResponseObject, tryParseJSON } from "src/lib/utils";

export function subtract(event: any, context: any, callback: any): void {
  console.log("received request: " + event.body);
  let request = tryParseJSON(event.body);

  if (request === false) {
    console.log("invalid request format provided");
    return callback(null, createResponseObject(400, { "message": "[400] Error!  invalid request body!" }));
  }

  if (typeof request.a === "undefined" || typeof request.b === "undefined")
    return callback(null, createResponseObject(400, { "message": "[400] Error!  arguments a and b are required!" }));

  if (typeof request.a !== "number" || typeof request.b !== "number")
    return callback(null, createResponseObject(400, { message: "[400] Error!  arguments a and b must be numbers!" }));

  const response = {
    message: "Go Serverless v1.0! Your subtract function executed successfully!",
    input: request,
    output: request.a - request.b,
  };

  return callback(null, createResponseObject(200, response));
};