'use strict';

var Transform = require('readable-stream/transform');
var PluginError = require('gulp-util').PluginError,
    fs = require('fs-extra'),
    PLUGIN_NAME = require("./const"),
    path = require("path");

module.exports = function(options) {

  return new Transform({
    objectMode: true,
    transform: function(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }      
      function doGenerate() {
        if (file.isStream()) {
          this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ' not supports streams!'));
        } else if (file.isBuffer()) {
          let chunks = String(file.contents);
          let flag = chunks.match(/<!\-\-\{\{[\w|\-]+\.[\w|\-]+\.html\}\}\-\->/g);
          let publicFile = [];
          if(flag!==null){
            for (let i = 0; i < flag.length; i++){
              let param = flag[i].slice(6, -5).split(".");
              let view = fs.readFileSync(path.dirname(file.path) + "/" + param[0]+".html", {
                encoding: 'utf8'
              });
              let content = chunks.replace(flag[i], view);
              let uselessFlags = content.match(/<!\-\-\{\{[\w|\-]+\.[\w|\-]+\.html\}\}\-\->/g);
              for(let j=0;j<uselessFlags.length;j++){
                content = content.replace(uselessFlags[j], "");
              }
              publicFile.push({
                filePath:options.dest + path.basename(file.path, '.html') + "_" + param[1]+".html",
                buffer : new Buffer(content),
                param: param[1]
              });              
            }
            for(let i = 0; i < publicFile.length; i++){
              fs.open(publicFile[i].filePath, 'w', function(err, fd) {
                  if (err) {
                      throw 'error opening file: ' + err;
                  }

                  fs.write(fd, publicFile[i].buffer, 0, publicFile[i].buffer.length, null, function(err) {
                      if (err) throw 'error writing file: ' + err;
                      fs.close(fd, function() {
                          console.log(path.basename(file.path, '.html') + "_" + publicFile[i].param+".html written");
                      })
                  });
              });
            }
          }          
          return callback(null, file);
        }

      }

      doGenerate();
    }
  });
};