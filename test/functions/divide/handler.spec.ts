import { divide } from "src/functions/divide/handler";

describe("Testing Division Operator", () => {
    let callback1 = function (error: any, response: any) {
        if (error !== null)
            throw new Error("Expected no errors but found " + error);
    };

    let callback3 = function (error: any, response: any) {
        if (response.statusCode !== 200)
            throw new Error("Expected status code of 200 but found " + response.statusCode);
    };
    let callback2 = function (error: any, response: any) {
        let result = JSON.parse(response.body);
        if (result.output !== 5)
            throw new Error("Expected output of 5 but found " + result.output);
    };

    let callback4 = function (error: any, response: any) {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        let result = JSON.parse(response.body);
        if (result.message !== "[400] Error!  arguments a and b are required!")
            throw new Error("Expected errors but found none");
    };

    let callback5 = function (error: any, response: any) {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        let result = JSON.parse(response.body);
        if (result.message !== "[400] Error!  arguments a and b must be numbers!")
            throw new Error("Expected non-number arguments to be rejected");
    };

    let callback6 = (error: any, response: any) => {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        let result = JSON.parse(response.body);
        if (result.message !== "[400] Error!  invalid request body!")
            throw new Error("Expected json parse error but found " + result.message);
    };

    describe("#divide", () => {
        it("should not return an error", () => {
            divide({ body: "{\"a\": 1, \"b\": 2}" }, null, callback1);
        });

        it("should divide the numbers", () => {
            divide({ body: "{\"a\": 10, \"b\": 2}" }, null, callback2);
        });

        it("should return a 200 status code", () => {
            divide({ body: "{\"a\": 1, \"b\": 2}" }, null, callback3);
        });

        it("should return an error if a is null", () => {
            divide({ body: "{\"b\": 2}" }, null, callback4);
        });

        it("should return an error if b is null", () => {
            divide({ body: "{\"a\": 1}" }, null, callback4);
        });

        it("should return an error if a is not a number", () => {
            divide({ body: "{\"a\": \"1\", \"b\": 2}" }, null, callback5);
        });

        it("should return an error if b is not a number", () => {
            divide({ body: "{\"a\": 1, \"b\": \"abc\"}" }, null, callback5);
        });

        it("should return an error if body is not valid JSON", () => {
            divide({ body: "3" }, null, callback6);
        });
    });

});