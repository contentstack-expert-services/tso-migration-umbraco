const fs = require('fs');
const mkdirp = require("mkdirp");


//var contentList = ["header", "footer", "homepage","staticpage"];
var contentList = ["contenttype"];
var export_content = [];

const migFinction = ()=>{
    try {
        for(let i=0;i<contentList.length;i++){
            var ModuleExport = require("./libs/" + contentList[i] + ".js");
            var moduleExport = new ModuleExport();
            export_content.push(
            (function (moduleExport) {
              return function () {
                return moduleExport.start();
              };
            })(moduleExport)
            );
        }
        
    } catch (error) {
        console.log("error occured",error);
        
    }
}
migFinction();





