const request = require('request-promise');
const urlApi = 'https://api-ott-prod-fe.mediaset.net/PROD/play/alive/nownext/v1.0?channelId=';

mediaset = async (url) => {
  const json = await request({uri: urlApi + url, json: true});
  return (json['response']['tuningInstruction']['urn:theplatform:tv:location:any'][0]['format'] == 'application/x-mpegURL' ? json['response']['tuningInstruction']['urn:theplatform:tv:location:any'][0]['publicUrls'][0] : json['response']['tuningInstruction']['urn:theplatform:tv:location:any'][1]['publicUrls'][0]);
}
exports.mediaset = mediaset;
