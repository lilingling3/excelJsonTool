const request = require('request');
const options = { json: true, headers: { apiKey: 'ddfCXxxEE134PREJYB!De12' } };

/** data may like:
 { _id: '597a033620590c1c265bb6fb',
    _createTime: 1500941871177,
    phoneNumber: [ '18600393748', '15811082362' ],
    Sales_Dealer_Name_CN: 'Porsche Centre Shenzhen Futian CSR',
    Sales_Dealer_Name_EN: 'Porsche Centre Shenzhen Longgang',
    Customer_Name: '钟 正楷',
    Title: '女士',
    Street: '福田区福强路1068号景源',
    Address: ' 福田区福强路1068号景源',
    Last_Name: '钟',
    First_Name: '正楷',
    Date_of_Birth: '1963.06.18',
    vin: 'WP1AG292XEL888888',
    Vehicle_Status: '新车',
    Model_Range_Name: 'Cayenne',
    Model_Year: 2014,
    Model_Type: 'A21',
    Model_Description: 'Cayenne Tip.China (3.0) "Plat.',
    Customer_Delivery_Date: '2014.09.19' 
  } 
 */

exports.fetCarOwnerByPhones = (phones, fields = ['phoneNumber', 'vin', 'Sales_Dealer_Name_CN']) => {
  return cb => {
    const body = { filter: { phoneNumber: { '$in': phones } }, options: { fields } };
    const mergedOptions = { ...options, ...{ body } };
    request.post(
      'http://101.52.132.155:2019/apiqy/f/v1/prod/porsche/car-owner-info/export', mergedOptions,
      (err, resp, body) => {
        err ? cb(err) : cb(null, body.data);
      }
    );
  }
}

exports.fetCarOwnerByVins = (vins, fields = ['phoneNumber', 'vin', 'Sales_Dealer_Name_CN']) => {
  return cb => {
    const body = { filter: { phoneNumber: { '$in': phones } }, options: { fields } };
    const mergedOptions = { ...options, ...{ body } };
    request.post(
      'http://101.52.132.155:2019/apiqy/f/v1/prod/porsche/car-owner-info/export', mergedOptions,
      (err, resp, body) => {
        err ? cb(err) : cb(null, body.data);
      }
    );
  }
}


exports.test = (vins) => {
  return cb => {
    request.get('http://www.zzkai.com:8888/getbooks', { headers: { apiKey: 'ddfCXxxEE134PREJYB!De12' } },
      (err, reply) => {
        err ? cb(err) : cb(reply.body);
      }
    );
  }
}