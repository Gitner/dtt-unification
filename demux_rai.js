const request = require('request-promise');

rai = async (url) => {
  const json = await request({uri: url, json: true});
  return json.video[0];
}
exports.rai = rai;
