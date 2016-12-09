import divide = require("../../../functions/divide/divide");

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
    });

});