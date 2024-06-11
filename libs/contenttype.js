var mkdirp = require("mkdirp"),
  path = require("path"),
  fs = require("fs");

//var helper = require("../utils/helper");
const reckittSchema = require('./reckittSchema');
const SchemaToContentstack = require('./contenttype-mapper');
const config = require('../config/index.json');
const contentstackSchema = require('./contentstackSchema');

const contenttypeFolder = config.modules.contentTypes.dirName;

//const contenttypeFile = config.modules.contentTypes;
if(!fs.existsSync(path.join(process.cwd(),config.data,contenttypeFolder))){
  mkdirp.sync(path.join(process.cwd(),config.data,contenttypeFolder));
}
var contenttypefile = path.join(process.cwd(),config.data,contenttypeFolder);

function contenttype(){
  const jsondata = reckittSchema();
  //console.log(jsondata);
  const data = SchemaToContentstack(jsondata?.properties?.data);
  contentstackSchema(data);

  if(!fs.existsSync(path.join(process.cwd(),config.data))){
    mkdirp.sync(path.join(process.cwd(),config.data));
  }
  fs.writeFileSync(path.join(process.cwd(),config.data,contenttypeFolder,'mapped.json'),JSON.stringify(data, null, 2));
const contentTypes = data[''];
for (const contentType of contentTypes) {
  const displayName = contentType['display_name'];
  const uid = contentType['uid'];
  const schema = contentType['schema'];
  const initialFields = [
    {
            display_name: 'Title',
            uid: 'title',
            data_type: "text",
            mandatory: true,
            unique: true,
            field_metadata: {
                "_default": true,
                "version": 3
            },
            multiple: false,
            non_localizable: false
    },
    {
           display_name: 'URL',
            uid: 'url',
            data_type: "text",
            mandatory: true,
            unique: true,
            field_metadata: {
                "_default": true,
                "version": 3
            },
            multiple: false,
            non_localizable: false


    }
  ];
  const concatArray = initialFields.concat(schema);
  const contentObject = {
    title: displayName,
    uid: uid,
    schema: concatArray,
    options: {
      is_page: true,
      title: "title",
      sub_title: [],
      url_pattern: "/:year/:month/:title",
      _version: 1,
      url_prefix:  `/${uid}/`,
      description: "",
      singleton: false,
    },
    description: "",
  };
  const contentJSON = JSON.stringify(contentObject, null, 2);
  fs.writeFileSync(path.join(process.cwd(),config.data,contenttypeFolder, `${uid}.json`), contentJSON);
}
 
}
module.exports = contenttype;