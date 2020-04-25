const request = require('request-promise');
const urlToken = 'https://dplayproxy.azurewebsites.net/api/config/init';

discovery = async (url) => {
  //richiede il json contenente l'AccessToken e lo estrae
  const setJson = await request({uri: urlToken, json: true}); 
  const bearer = setJson.Data.AccessToken.split('__!__')[0];
  const options = {url: url, json: true, headers: {'Authorization': 'Bearer ' + bearer}};
  //richiede il json col link al canale
  const json = await request(options);
  return json.data.attributes.streaming.hls.url;
}
exports.discovery = discovery;
