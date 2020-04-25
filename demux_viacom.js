const request = require('request-promise');
viacom = async (url) => {
  const json = await request({uri: url, json: true});
  return json.package.video.item[0].rendition[0].src;
}
exports.viacom = viacom;
