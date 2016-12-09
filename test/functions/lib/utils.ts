import utils = require("../../../functions/lib/utils");

describe("Testing Utility Functions", () => {
    describe("#createResponseObject", () => {
        it ("should not return an error", () => {
            let result = utils.createResponseObject(200, {"a": 1, "b": 2});
            if (result.statusCode != 200)
                throw new Error("Expected status code of 200 but found " + result.statusCode);
            if (result.body != "{\"a\":1,\"b\":2}")
                throw new Error("Expected body of {\"a\":1,\"b\":2} but found " + result.body);
        });
    });

    describe("#tryParseJson", () => {
        it("should return an object for valid json", () => {
            let input = "{\"a\":1,\"b\":2}";
            let output = utils.tryParseJSON(input);
            if (!output || typeof output !== "object") 
                throw new Error("Expected result of object but found " + typeof output);
        });

        it("should return false for invalid json", () => {
            let input = "";
            let output = utils.tryParseJSON(input);
            if (output || typeof output === "object")
                throw new Error("Expected result of false but found " + JSON.stringify);
        });

        it("should return false for non-object results", () => {
            let input = "false";
            let output = utils.tryParseJSON(input);
            if (output)
                throw new Error("Expected result of object but found " + typeof output);
        });
    });
});