var cf = require('./common-func');
var co = require('co');
var excelTool = require('../tool/excel');
var fs = require('../tool/fs');

function* main() {
  console.log('start to execute ......');
  var dataList = excelTool.parse(__dirname + '/0209.xlsx', null, {
    A: { name: 'provinceId', type: 'number' },
    B: { name: 'provice', type: 'string' },
    C: { name: 'cityId', type: 'number' },
    D: { name: 'city', type: 'string' },
  });

  var provinceId_cityIds_ = {};// key: provinceId , value: cityIds
  var provinceId_provice_ = {};
  var cityId_city_ = {};
  //这里只是给一个示范，其实数据可以任意组织了
  dataList.forEach(v => {
    var { provinceId, provice, cityId, city } = v;

    var cityIds = provinceId_cityIds_[provinceId];
    if(!cityIds)cityIds = provinceId_cityIds_[provinceId] = [];
    cityIds.push(cityId);

    provinceId_provice_[provinceId] = {provinceId, provice};
    
    cityId_city_[cityId] = {cityId, city};
  });

  var str1 = JSON.stringify(provinceId_cityIds_);
  var str2 = JSON.stringify(provinceId_provice_);
  var str3 = JSON.stringify(cityId_city_);
  console.log(str1);
  console.log(str2);
  console.log(str3);
  yield fs.writeFile(__dirname+'/json-data.txt', str1+'\n\n'+str2+'\n\n'+str3)
}

co(main()).catch(err => console.log(err.stack))