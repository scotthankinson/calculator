import { add } from "../../../src/functions/add/handler";

describe("Testing Addition Operator", () => {
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
        if (result.output !== 3)
            throw new Error("Expected output of 3 but found " + result.output);
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

    describe("#addition", () => {
        it("should not return an error", () => {
            add({ body: "{\"a\": 1, \"b\": 2}" }, null, callback1);
        });

        it("should add the numbers", () => {
            add({ body: "{\"a\": 1, \"b\": 2}" }, null, callback2);
        });

        it("should return a 200 status code", () => {
            add({ body: "{\"a\": 1, \"b\": 2}" }, null, callback3);
        });

        it("should return an error if a is null", () => {
            add({ body: "{\"b\": 2}" }, null, callback4);
        });

        it("should return an error if b is null", () => {
            add({ body: "{\"a\": 1}" }, null, callback4);
        });

        it("should return an error if a is not a number", () => {
            add({ body: "{\"a\": \"1\", \"b\": 2}" }, null, callback5);
        });

        it("should return an error if b is not a number", () => {
            add({ body: "{\"a\": 1, \"b\": \"abc\"}" }, null, callback5);
        });

        it("should return an error if body is not valid JSON", () => {
            add({ body: "3" }, null, callback6);
        });
    });

});