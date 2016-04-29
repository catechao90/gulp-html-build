/**
 * 
 * @authors Cate Zhao	
 * @date    2016-04-29 10:13:45
 * @version $Id$
 */
'use strict';
var Transform = require('readable-stream/transform');
var fs = require('fs-extra'),
    path = require("path");


module.exports = function() {
  return new Transform({
    objectMode: true,
    transform: function(file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }
      let key = path.basename(file.path, '.html').split("--");
      fs.renameSync(file.path, path.parse(file.path).dir+"/"+key[0]+path.parse(file.path).ext);
      return callback(null, file);  
    }
  });
};