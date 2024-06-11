//const {singleLine,boolean,multiLine,group} = require('../contentstackSchema');
const reckittSchema = require('./reckittSchema');
const data = require('../data/data.json');

const extensions = [".svg",".jpg"];
function getImage(data){
  const keyValues = [];
  const stack = [{ obj: data, parentKey: '' }];
  while (stack.length > 0) {
    const { obj, parentKey } = stack.pop();
    for (const key in obj) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object') {
        stack.push({ obj: value, parentKey: currentKey });
      } else if (typeof value === 'string') {
        for (const extension of extensions) {
          if (value.endsWith(extension)) {
            keyValues.push({ currentKey,value });
            break;
          }
        }
      }
    }
  }
  return keyValues;
}

const keyValues = getImage(data, extensions);
//console.log(keyValues);
//let lastParts = "";
let lastParts = keyValues.map(item => {
  const parts = item.currentKey.split('.');
  return parts[parts.length - 1];
});
//console.log(lastParts);

function SchemaToContentstack(schema) {
    const mappedFields = {};
    const regex = "";
    function mapProperties(properties) {
      var mappedProperties = [];  

      Object.keys(properties).forEach((key) => {
        const field = properties[key];
        //console.log(key);
        const fieldType = field.type;
        if (fieldType === 'string' && field.format === 'color') {
          mappedProperties.push({
            data_type: 'text',
            display_name: key,
            uid: key.toLowerCase(),
            field_metadata: {
              description: '',
              default_value: '',
            },
            multiple: false,
            mandatory: false,
            unique: false,
          });
        } 
        else if(fieldType === 'string' && lastParts.includes(key)){
          //console.log("mathced");
          mappedProperties.push({
              data_type: 'file',
              display_name: key,
              uid: key.toLowerCase(),
              extensions: [],
              field_metadata: {
                  description: "",
                  rich_text_type: 'standard'
              },
              multiple: false,
              mandatory: false,
              unique: false         
          });
        }
        else if (fieldType === 'string') {
          mappedProperties.push({
            data_type: 'text',
            display_name: key,
            uid: key.toLowerCase(),
            field_metadata: {
              description: '',
              default_value: '',
            },
            multiple: false,
            mandatory: false,
            unique: false,
          });
        } else if (fieldType === 'boolean') {
          mappedProperties.push({
            data_type: 'boolean',
            display_name: key,
            uid: key.toLowerCase(),
            field_metadata: {
              description: '',
              default_value: '',
            },
            multiple: false,
            mandatory: false,
            unique: false,
          });
        } else if (fieldType === 'object' && field.properties) {
          mappedProperties.push({
            data_type: 'group',
            display_name: key,
            uid: key.toLowerCase(),
            schema: mapProperties(field.properties),
          });
        } else if (fieldType === 'array' && field.items && field.items.properties) {
          mappedProperties.push({
            data_type: 'group',
            display_name: key,
            uid: key.toLowerCase(),
            schema: mapProperties(field.items.properties),
          });
        }
        else if(fieldType === 'array'){
          mappedProperties.push({
            data_type: 'group',
            display_name: key,
            uid: key.toLowerCase(),
            schema: mapProperties(field),
          });

        }
       });  
      return mappedProperties;
    }  
    if (schema.type === 'object' && schema.properties) {
      mappedFields[''] = mapProperties(schema.properties);
    } 
    return mappedFields;
  }  
  
module.exports = SchemaToContentstack;
