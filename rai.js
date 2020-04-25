//crea il dizionario obj e lo scrive come json {canale:link}
async function objRai(data) {
  //nome dello script con aggiunta suffisso 'on' name.js => name.json
  const iJson = path.basename(__filename) + 'on';
  var obj = {};
  for (var diretta in data.dirette) {
    //replace 'Diretta di ' davanti al nome, getLink attende che la promessa sia mantenuta
    obj[data.dirette[diretta].name.replace(/diretta\s*di\s*/i, '')] = data.dirette[diretta].video.contentUrl + '&output=47';
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
//url all'Api contenente link a icone e flussi a/v dei canali
const urlApi = 'http://www.rai.it/dl/RaiPlay/2016/PublishingBlock-9a2ff311-fcf0-4539-8f8f-c4fee2a71d58.html?json';
//chiama il json con la lista canali ne fa il parsing e crea il file rai.json
request(urlApi).then(JSON.parse).then(objRai);
