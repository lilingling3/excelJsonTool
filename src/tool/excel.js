var xlsx = require('xlsx-style');

function formatCellValue(cellValue, colDef) {
  if (colDef.type == 'number') return parseInt(cellValue);
  else return cellValue
}

/**
 * 
 * @param {*} filePath 
 * @param {*} sheetName 
 * @param {*} columnConf {'A':{name:'age',type:'number'},'B':{name:'code',type:'string'}}
 */
exports.parse = (filePath, sheetName, columnConf) => {
  var workbook = xlsx.readFile(filePath);
  var sheet = workbook.Sheets[sheetName];
  if (!sheet) {//取默认第一个
    sheetName = workbook.SheetNames[0];
    sheet = workbook.Sheets[sheetName];
  }
  if (!sheet) throw new Error('文件格式错误!sheet名称必须为:' + sheetName + ',当前为:' + workbook.SheetNames[0]);

  var startRow = 2;//第2行开始解析
  var lastestReadLine = startRow;
  var dataList = [];
  var tmp = {};
  var isLastLinePushed = false;
  for (var key in sheet) {
    if (!key.startsWith('!')) {
      var cell = sheet[key];
      var cellValue = cell.v;
      var lineNo = parseInt(key.substr(1));//行号:1 2 3 4 ...
      var colNo = key.substr(0, 1);//列号:A B C D E F ...

      if (lineNo >= startRow) {
        var colDef = columnConf[colNo];
        if (colDef) {
          if (lastestReadLine != lineNo) {
            dataList.push(tmp);
            tmp = {[colDef.name]:formatCellValue(cellValue, colDef)};
            lastestReadLine = lineNo;
          } else {
            var hasNextLine = sheet[colNo + (lineNo + 1)] != null;
            if (hasNextLine) {
              tmp[colDef.name] = formatCellValue(cellValue, colDef);
            } else {//到了最后一行
              if (!isLastLinePushed) {
                isLastLinePushed = true;
                dataList.push(tmp);
              }
              tmp[colDef.name] = formatCellValue(cellValue, colDef);
            }
          }
        }
      }
    }
  }

  // if(lastestReadLine!=startRow)dataList.push(tmp);//补上最后遗漏的那一个

  return dataList
}