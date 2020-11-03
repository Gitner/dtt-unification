//crea il dizionario obj e lo scrive come json {canale:link}
async function objDiscovery(json) {
  //nome dello script con aggiunta suffisso 'on' name.js => name.json
  const iJson = path.basename(__filename) + 'on';
  //template del link al canale
  const tplLink = 'https://eu2-prod.disco-api.com/playback/channelPlaybackInfo/*?usePreAuth=true'
  var obj = {}, data = json.included;
  for (var entry  in data) {
    obj[data[entry].meta.path.toUpperCase().replace(/-/g, ' ')] = tplLink.replace('*', data[entry].relationships.channel.data.id);
  }
  //scrive il file json contenente la lista dei canali
  fs.writeFile(iJson , JSON.stringify(obj), (err) => {
    if (err) throw err;
    console.log('Lista canali scritta correttamente');
  });
}
//libreria per eseguire una richiesta http che restituisce una promessa
const request = require('request-promise');
//libreria per gestire lettura/scrittura file
const fs = require('fs');
//libreria per gestire i percorsi dei file
const path = require('path');
//contenitore della chiave che permette di accedere alle informazioni
const urlToken = 'https://eu2-prod.disco-api.com/token?realm=dplayit';
//url all'api con le informazioni per riprodurre i flussi a/v dei canali
const urlApi = 'https://eu2-prod.disco-api.com/cms/collections/dplay-channels?include=items';
//chiama il json con il Token e lo estrae
request(urlToken).then(JSON.parse).then((json) => {
  const bearer = json.data.attributes.token;
  //chiama il json con la lista canali ne fa il parsing e crea il file discovery.json
  request({url: urlApi, headers: {'authorization': 'Bearer ' + bearer}}).then(JSON.parse).then(objDiscovery);
});
