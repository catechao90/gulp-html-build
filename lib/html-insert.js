'use strict';

var Transform = require('readable-stream/transform');
var PluginError = require('gulp-util').PluginError,
    fs = require('fs-extra'),
    PLUGIN_NAME = require("./const");


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
          let flag = chunks.match(/<!\-\-\{\{[\w|\-]+\.html\}\}\-\->/g);
    		  if(flag!=null){
    			  for (var i = 0; i < flag.length; i++) {
    					let view = fs.readFileSync(options.src + flag[i].slice(6, -5), {
    					  encoding: 'utf8'
    					});                        
    					file.contents = new Buffer(String(file.contents).replace(flag[i], view));
        		}
    			}
          
          return callback(null, file);
        }

      }
      doInsert();
    }
  });
};