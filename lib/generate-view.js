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
            let insertFlag = {};
            for (let i = 0; i < flag.length; i++){
              let param = flag[i].slice(6, -5).split(".");
              if(insertFlag[param[1]]===undefined){
                insertFlag[param[1]] = [];
              }

              insertFlag[param[1]].push({
                name:param[0],
                flag:flag[i]
              })
            }
            
            for(var key in insertFlag){
              var views = [];
              let content = chunks;
              for (let i = 0; i < insertFlag[key].length; i++){
                let view = fs.readFileSync(path.dirname(file.path) + "/" + insertFlag[key][i].name+".html", {
                  encoding: 'utf8'
                });
                content = content.replace(insertFlag[key][i].flag, view);
              }
              let uselessFlags = content.match(/<!\-\-\{\{[\w|\-]+\.[\w|\-]+\.html\}\}\-\->/g);
              for(let j=0;j<uselessFlags.length;j++){
                content = content.replace(uselessFlags[j], "");
              }
              publicFile.push({
                filePath:options.dest + path.basename(file.path, '.html') + "_" + key+".html",
                buffer : new Buffer(content),
                param: key
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
          // return callback(null, file);
        }

      }

      doGenerate();
    }
  });
};