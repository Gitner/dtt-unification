//crea il dizionario obj e lo scrive come json {canale:link}
async function objDiscovery(data) {
  //nome dello script con aggiunta suffisso 'on' name.js => name.json
  const iJson = path.basename(__filename) + 'on';
  var obj = {};
  for (var entry  in data.Data) {
    obj[data.Data[entry].Title] = data.Data[entry].PlaybackInfoUrl;
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
const urlToken = 'https://dplayproxy.azurewebsites.net/api/config/init';
//url all'api con le informazioni per riprodurre i flussi  a/v dei canali
const urlApi = 'https://dplayproxy.azurewebsites.net/api/TvVideo/LiveList';
//chiama il json con l'AccessToken e lo estrae
request(urlToken).then(JSON.parse).then((json) => {
  const aToken = json.Data.AccessToken;
  const bearer = aToken.split('__!__')[0];
  //chiama il json con la lista canali ne fa il parsing e crea il file discovery.json
  request({url: urlApi, headers: {'AccessToken': aToken}}).then(JSON.parse).then(objDiscovery);
});
