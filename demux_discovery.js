const request = require('request-promise');
const urlToken = 'https://eu2-prod.disco-api.com/token?realm=dplayit';

discovery = async (url) => {
  //richiede il json contenente il Token e lo estrae
  const setJson = await request({uri: urlToken, json: true});
  const bearer = setJson.data.attributes.token;
  const options = {url: url, json: true, headers: {'Authorization': 'Bearer ' + bearer}};
  //richiede il json col link al canale
  const json = await request(options);
  return json.data.attributes.streaming.hls.url;
}
exports.discovery = discovery;
