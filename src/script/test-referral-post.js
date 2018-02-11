const request = require('request');
const options = { json: true, headers: { apiKey: 'ddfCXxxEE134PREJYB!De12' } };

exports.fetchPhoneCodeLogGet = (phoneNumber) => {
  return cb => {
    request.get(
      'http://101.52.132.155:2019/apiqy/f/v1/prod/porsche/car-owner-info/phone-code-log?phoneNumber=' + phoneNumber, options,
      (err, resp, body) => {
        err ? cb(err) : cb(null, body.data);
      }
    );
  }
}

exports.fetchPhoneCodeLogPost = (filter) => {
  return cb => {
    const requestOptions = { ...options, body: { filter } };
    request.post(
      'http://101.52.132.155:2019/apiqy/f/v1/prod/porsche/car-owner-info/phone-code-log', requestOptions,
      (err, resp, body) => {
        err ? cb(err) : cb(null, body.data);
      }
    );
  }
}

// exports.fetchPhoneCodeLogGet('18600393748')((err, result) => {
//   console.log(err, result);
// })
exports.fetchPhoneCodeLogPost( {phoneNumber:{'$in':['18600393748','12233334444']}} )((err, result) => {
  console.log(err, result);
})