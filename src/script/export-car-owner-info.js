var cf = require('./common-func');
var co = require('co');
var excelTool = require('../tool/excel');
var fs = require('../tool/fs');

function *main() {
  console.log('start to execute ......');
  // var dataList = excelTool.parse(__dirname + '/some.xlsx', null, {
  //   A: { name: 'phone', type: 'string' },
  //   B: { name: 'xxx', type: 'string' },
  // });
  // var phones = dataList.map(v=> v.phone);

  var resultList = yield cf.fetCarOwnerByPhones(['18600393748']);
  console.log(resultList)
  yield fs.writeToCSV(__dirname + '/result.csv', resultList);
  console.log('done!');
}

co(main()).catch(err => console.log(err))

