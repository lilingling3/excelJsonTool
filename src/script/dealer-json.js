var cf = require('./common-func');
var co = require('co');
var excelTool = require('../tool/excel');
var fs = require('../tool/fs');

function* main() {
  console.log('start to execute ......');
  var dataList = excelTool.parse(__dirname + '/0209.xlsx', '经销商基础字典', {
    A: { name: 'dealerid', type: 'number' },
    B: { name: 'dealercode', type: 'string' },
    C: { name: 'dealerSimpleName', type: 'string' },
    D: { name: 'dealerName', type: 'string' },
  });

  var dealer_dict = {};// key: provinceId , value: cityIds
  //这里只是给一个示范，其实数据可以任意组织了
  dataList.forEach(v => {
    var { dealerid, dealercode, dealerSimpleName, dealerName } = v;

    dealer_dict[dealerid]= {dealerid,dealercode,dealerSimpleName,dealerName};
  });

  var str1 = JSON.stringify(dealer_dict);
 
  console.log(str1);
  
  yield fs.writeFile(__dirname+'/json-data-2.txt', str1)
}

co(main()).catch(err => console.log(err.stack))