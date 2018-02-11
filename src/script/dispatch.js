var cf = require('./common-func');
var co = require('co');
var excelTool = require('../tool/excel');
var fs = require('../tool/fs');

function* main() {
  console.log('start to execute ......');
  var dataList = excelTool.parse(__dirname + '/0209.xlsx', '派发规则表', {
    A: { name: 'dealerid', type: 'number' },
    D: { name: 'cityId', type: 'number' },
  });

  var city_dealer_dict = {};// key: provinceId , value: cityIds
  //这里只是给一个示范，其实数据可以任意组织了
  dataList.forEach(v => {
    var { dealerid, cityId } = v;
    var cityArray = city_dealer_dict[cityId];
    if(!cityArray) cityArray =  city_dealer_dict[cityId] = [];
    cityArray.push(dealerid);
  });

  var str1 = JSON.stringify(city_dealer_dict);
 
  console.log(str1);
  
  yield fs.writeFile(__dirname+'/json-data-dispatch.txt', str1)
}

co(main()).catch(err => console.log(err.stack))