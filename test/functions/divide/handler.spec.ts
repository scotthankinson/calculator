import { divide } from "../../../src/functions/divide/handler";

describe("Testing Division Operator", () => {
    const callback1 = (error: any, _response: any) => {
        if (error !== null)
            throw new Error("Expected no errors but found " + error);
    };

    const callback3 = (_error: any, response: any) => {
        if (response.statusCode !== 200)
            throw new Error("Expected status code of 200 but found " + response.statusCode);
    };

    const callback2 = (_error: any, response: any) => {
        const result = JSON.parse(response.body);
        if (result.output !== 5)
            throw new Error("Expected output of 5 but found " + result.output);
    };

    const callback4 = (_error: any, response: any) => {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        const result = JSON.parse(response.body);
        if (result.message !== "[400] Error!  arguments a and b are required!")
            throw new Error("Expected errors but found none");
    };

    const callback5 = (_error: any, response: any) => {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        const result = JSON.parse(response.body);
        if (result.message !== "[400] Error!  arguments a and b must be numbers!")
            throw new Error("Expected non-number arguments to be rejected");
    };

    const callback6 = (_error: any, response: any) => {
        if (response.statusCode !== 400)
            throw new Error("Expected status code of 400 but found " + response.statusCode);

        const result = JSON.parse(response.body);
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