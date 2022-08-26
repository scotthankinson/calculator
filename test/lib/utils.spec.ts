import { createResponseObject, tryParseJSON } from "../../src/lib/utils";

describe("Testing Utility Functions", () => {
    describe("#createResponseObject", () => {
        it("should not return an error", () => {
            const result = createResponseObject(200, { "a": 1, "b": 2 });
            if (result.statusCode !== 200)
                throw new Error("Expected status code of 200 but found " + result.statusCode);
            if (result.body !== "{\"a\":1,\"b\":2}")
                throw new Error("Expected body of {\"a\":1,\"b\":2} but found " + result.body);
        });
    });

    describe("#tryParseJson", () => {
        it("should return an object for valid json", () => {
            const input = "{\"a\":1,\"b\":2}";
            const output = tryParseJSON(input);
            if (!output || typeof output !== "object")
                throw new Error("Expected result of object but found " + typeof output);
        });

        it("should return false for invalid json", () => {
            const input = "";
            const output = tryParseJSON(input);
            if (output || typeof output === "object")
                throw new Error("Expected result of false but found " + JSON.stringify);
        });

        it("should return false for non-object results", () => {
            const input = "false";
            const output = tryParseJSON(input);
            if (output)
                throw new Error("Expected result of object but found " + typeof output);
        });
    });

});