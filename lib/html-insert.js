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
      if(!options){
        this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ' needs src option!'));
      }
      function doInsert() {
        if (file.isStream()) {
          this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ' not supports streams!'));
        } else if (file.isBuffer()) {
          let chunks = String(file.contents);
          let key = path.basename(file.path, '.html').split("--");          
          let flag = chunks.match(/<!\-\-\{\{[\w|\-]+\.html\}\}\-\->/g);          
    		  if(flag!=null){
    			  for (var i = 0; i < flag.length; i++) {
    					let view = fs.readFileSync(options.src + flag[i].slice(6, -5), {
    					  encoding: 'utf8'
    					});
              var insertView = getViews(view, key[1], options);                      
    					file.contents = new Buffer(String(file.contents).replace(flag[i], insertView));
        		}
    			}
          return callback(null, file);
        }
      }
      doInsert();
    }
  });
};

let getViews = (view, key, options) => {
  let flag = view.match(/<!\-\-\{\{\w*=(\w*\s*\w*|\w*.html)\}\}\-\->/g);
  let publicFile = [];
  let content = view;
  if(flag!==null){
    let insertFlag = [];
    for (let i = 0; i < flag.length; i++){
      let param = flag[i].slice(6, -5).split("=");
      if(insertFlag[param[1]]===undefined){
        insertFlag[param[1]] = [];
      }

      insertFlag.push({
        name:param[0],
        flag:flag[i],
        value:param[1]
      })
    }
    for (let i = 0; i < insertFlag.length; i++){
      if(insertFlag[i].name==key){
        if(insertFlag[i].value.indexOf(".html")>0){
          insertFlag[i].value = fs.readFileSync(options.src+insertFlag[i].value, {
            encoding: 'utf8'
          });
        }
        content = content.replace(insertFlag[i].flag, insertFlag[i].value);
      }
      else{
        content = content.replace(insertFlag[i].flag, "");
      }
    }
  }
  return content;
}

