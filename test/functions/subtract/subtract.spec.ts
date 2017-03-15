import subtract = require("../../../src/functions/subtract/subtract");

describe("Testing Subtraction Operator", () => {
    var callback1 = function(error: any, response: any){
        if (error !== null)
            throw new Error("Expected no errors but found " + error);
    };
    var callback2 = function(error: any, response: any){
        if (response.statusCode !== 200)
            throw new Error("Expected status code of 200 but found " + response.statusCode);
    };
    var callback3 = function(error: any, response: any){
        let result = JSON.parse(response.body);
        if (result.output !== 3)
            throw new Error("Expected output of 3 found " + result.output);
    };

    describe("#subtraction", () => {
        it ("should not return an error", () => {
            subtract.subtraction({body: "{\"a\": 5, \"b\": 2}"}, null, callback1);
        });

        it("should subtract the numbers", () => {
            subtract.subtraction({body: "{\"a\": 5, \"b\": 2}"}, null, callback2);
        });

        it("should return a 200 status code", () => {
            subtract.subtraction({body: "{\"a\": 5, \"b\": 2}"}, null, callback3);
        });
    });

});