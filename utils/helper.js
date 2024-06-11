var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

exports.readFile = function (filePath, parse) {
    parse = typeof parse == "undefined" ? true : parse;
    filePath = path.resolve(filePath);
    var data;
    if (fs.existsSync(filePath))
      data = parse ? JSON.parse(fs.readFileSync(filePath, "utf-8")) : data;
    return data;
};