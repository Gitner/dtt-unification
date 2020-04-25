const request = require('request-promise');
const urlApi = 'https://apid.sky.it/vdp/v1/getLivestream?id=7&jsonp=';

tv8 = async (url) => {
  const json = await request({uri: urlApi, json: true});
  return json.streaming_url;
}
exports.tv8 = tv8;
