const express = require("express");
const router = express.Router();
const parseString = require("xml2js").parseString;
const xml2js = require("xml2js");

function jsonToGraphql(jsonObj, typeName) {
    let graphqlString = `type ${typeName} {`;
    for (const [key, value] of Object.entries(jsonObj)) {
        const valueType = typeof value;
        switch (valueType) {
            case "string":
                graphqlString += `${key}: String`;
                break;
            case "number":
                graphqlString += `${key}: Int`;
                break;
            case "boolean":
                graphqlString += `${key}: Boolean`;
                break;
            default:
                throw new Error(`Unknown value type: ${valueType}`);
        }
        graphqlString += "\n";
    }
    graphqlString += "}";
    return graphqlString;
}

function jsonToSoap(jsonObj, method, namespace) {
    let soapXml = `<?xml version="1.0"?>\n`;
    soapXml += `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope/" soap:encodingStyle="http://www.w3.org/2003/05/soap-encoding">\n`;
    soapXml += `<soap:Body>\n`;
    soapXml += `<${namespace}:${method} xmlns:${namespace}="https://www.w3schools.com/data">\n`;
    for (const [key, value] of Object.entries(jsonObj)) {
        soapXml += `<${namespace}:${key}>${value}</${namespace}:${key}>\n`;
    }
    soapXml += `</${namespace}:${method}>\n`;
    soapXml += `</soap:Body>\n`;
    soapXml += `</soap:Envelope>`;
    return soapXml;
}

function getItemValueFromNestedObject(obj) {
    const keys = Object.keys(obj);
    const keyWithItemValue = keys.find((key) => key.includes("Item"));

    return obj[keyWithItemValue][0];
}

function convertArrayToGraphQLQuery(arr, queryTemplate, variableName) {
    const itemValue = getItemValueFromNestedObject(arr[0]);
    const variables = { [variableName]: itemValue };

    const query = queryTemplate.replace(
        `$${variableName}`,
        `$${variableName}: String!`
    );

    return { query, variables };
}

router.use((req, res, next) => {
    const time = new Date();
    console.log(
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${
            req.method
        } ${req.url}`
    );
    next();
});

router.post("/json-to-graphql", (req, res) => {
    const { json } = req.body;
    const query = jsonToGraphql(json, "AutoGenerated");
    res.send(query);
});

router.post("/json-to-soap", (req, res) => {
    const xml = jsonToSoap(req.body, "Body", "root");
    res.send(xml);
});

router.post("/soap-to-json", (req, res) => {
    res.json(req.body);
});

router.post("/soap-to-graphql", (req, res) => {
    res.send(req.body);
    // const graphObj = req.body["soap:Envelope"]["soap:Body"][0];
    // res.json(graphObj);
});

module.exports = router;
