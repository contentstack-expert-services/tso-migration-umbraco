//const toJsonSchema = require('to-json-schema');
const fs = require('fs');
const data = require('../data/data.json');
const GenerateSchema = require('generate-schema');

function reckittSchema() {
    try {
        //const schema = toJsonSchema(data);
        const schema = GenerateSchema.json(data);
        fs.writeFileSync('schema.json', JSON.stringify(schema, null, 2));
        return schema;
    } catch (error) {
        console.error('Error generating schema', error);
    }
}

module.exports = reckittSchema;
