const fs = require('fs');
var json2csv = require('json2csv');
var iconv = require('iconv-lite');

exports.writeToCSV = (fileFullName, list) => {
  return cb => {
    json2csv({ data: list }, function (err, csv) {
      if(err) return cb(err);
      csv = iconv.encode(csv, 'GBK'); // 转编码,兼容windows office
      fs.writeFile(fileFullName, csv, function (err) {
        cb(err)
      });
    });
  }
}

exports.writeFile = (fileFullName, content)=>{
  return cb=>{
    fs.writeFile(fileFullName, content, cb);
  }
}