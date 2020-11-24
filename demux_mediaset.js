const request = require('request-promise');
const urlApi = 'https://static3.mediasetplay.mediaset.it/apigw/nownext/';

mediaset = async (callSign) => {
  const json = await request({uri: urlApi + callSign + '.json', json: true});
  return (json.response.tuningInstruction['urn:theplatform:tv:location:any'][0]['format'] == 'application/x-mpegURL' ? json.response.tuningInstruction['urn:theplatform:tv:location:any'][0]['publicUrls'][0] : json.response.tuningInstruction['urn:theplatform:tv:location:any'][1]['publicUrls'][0]);
}
exports.mediaset = mediaset;
