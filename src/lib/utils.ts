
export function createResponseObject(statusCode: number, body: any): any {
    const response = {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body),
    };

    console.log("assembled response: " + JSON.stringify(response));
    return response;
};

export function tryParseJSON(jsonString: string): any {
    try {
        const o = JSON.parse(jsonString);

        if (typeof o === "object") {
            return o;
        }
    }
    catch (e) { console.log(e) }

    return false;
};
