import add = require("../../../functions/add/add");

describe("Testing Addition Operator", () => {
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
        if (result.output !== 3)
            throw new Error("Expected output of 3 but found " + result.output);
    };
    var callback4 = function(error: any, response: any){
        if (response.statusCode != 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);
        
        let result = JSON.parse(response.body);
        if (result.message !== '[400] Error!  arguments a and b are required!')
            throw new Error("Expected errors but found none");
    };
    var callback5 = function(error: any, response: any){
        if (response.statusCode != 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);
        
        let result = JSON.parse(response.body);
        if (result.message !== '[400] Error!  arguments a and b must be numbers!')
            throw new Error("Expected non-number arguments to be rejected");
    }

    describe("#addition", () => {
        it ("should not return an error", () => {
            add.addition({body: "{\"a\": 1, \"b\": 2}"}, null, callback1);
        });

        it("should add the numbers", () => {
            add.addition({body: "{\"a\": 1, \"b\": 2}"}, null, callback2);
        });

        it("should return a 200 status code", () => {
            add.addition({body: "{\"a\": 1, \"b\": 2}"}, null, callback3);
        });

        it("should return an error if a is null", () => {
            add.addition({body: "{\"b\": 2}"}, null, callback4);
        });

        it("should return an error if b is null", () => {
            add.addition({body: "{\"a\": 1}"}, null, callback4);
        });

        it("should return an error if a is not a number", () => {
            add.addition({body: "{\"a\": \"1\", \"b\": 2}"}, null, callback5);
        });

        it("should return an error if b is not a number", () => {
            add.addition({body: "{\"a\": 1, \"b\": \"2\"}"}, null, callback5);
        });
    });

});