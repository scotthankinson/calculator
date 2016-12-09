import multiply = require("../../../functions/multiply/multiply");

describe("Testing Multiplication Operator", () => {
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
        if (result.output !== 4)
            throw new Error("Expected output of 4 but found " + result.output);
    };

    describe("#multiplication", () => {
        it ("should not return an error", () => {
            multiply.multiplication({body: "{\"a\": 2, \"b\": 2}"}, null, callback1);
        });

        it("should multiply the numbers", () => {
            multiply.multiplication({body: "{\"a\": 2, \"b\": 2}"}, null, callback2);
        });

        it("should return a 200 status code", () => {
            multiply.multiplication({body: "{\"a\": 2, \"b\": 2}"}, null, callback3);
        });
    });

});