import divide = require("../../../src/functions/divide/divide");

describe("Testing Division Operator", () => {
    var callback1 = function(error: any, response: any){
        if (typeof error === 'null')
            throw new Error("Expected no errors but found " + error);
    };
    var callback2 = function(error: any, response: any){
        if (response.statusCode !== 200)
            throw new Error("Expected status code of 200 but found " + response.statusCode);
    };
    var callback3 = function(error: any, response: any){
        let result = JSON.parse(response.body);
        if (result.output !== 5)
            throw new Error("Expected output of 5 found " + result.output);
    };
     let callback4 = function(error: any, response: any){
        let result = JSON.parse(response.body);
        if (response.statusCode !== 400)
            throw new Error("Invalid JSON passed, expected status 400, found: "+response.statusCode);
        if (result.message !== '[400] Error!  Invalid Request Body!')
            throw new Error("Expected output: "+'[400] Error!  Invalid Request Body!'+'/n returned output: '+result.message);

    };

    let callback5 = function(error: any, response: any){
        let result = JSON.parse(response.body);
        if (response.statusCode !== 400)
            throw new Error("Invalid argument a or b, expected status 400, found: "+response.statusCode);
        if (result.message !== '[400] Error! a and be must be numbers!')
            throw new Error("Expected response message of [400] Error! a and be must be numbers! but found " + response.message);
    };

    describe("#division", () => {
        it ("should not return an error", () => {
            divide.division({body: "{\"a\": 10, \"b\": 2}"}, null, callback1);
        });

        it("should divide the numbers", () => {
            divide.division({body: "{\"a\": 10, \"b\": 2}"}, null, callback2);
        });

        it("should return a 200 status code", () => {
            divide.division({body: "{\"a\": 10, \"b\": 2}"}, null, callback3);
        });

        it("should return bad request when parseJSON fails", () => {
            divide.division({body: "abc"}, null, callback4);
        });

        it("should return bad request when a is a string", () => {
            divide.division({body: "{\"a\": \"waffles\", \"b\": 2}"}, null, callback5);
        });

        it("should return bad request when b is a string", () => {
            divide.division({body: "{\"a\": 1, \"b\": \"waffels\"}"}, null, callback5);
        });

    });

});