//crea il dizionario obj e lo scrive come json {canale:callSign}
async function objMediaset(data) {
  //nome dello script con aggiunta suffisso 'on' name.js => name.json
  const iJson = path.basename(__filename) + 'on';
  var obj = {};
  for (var entry in data.entries) {
    obj[data.entries[entry].title] = data.entries[entry].callSign;
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
const urlApi = 'https://feed.entertainment.tv.theplatform.eu/f/PR1GhC/mediaset-prod-all-stations?bycallsign=&range=1-1000&fields=callSign,title';
//chiama il json con la lista canali ne fa il parsing e crea il file rai.json
request(urlApi).then(JSON.parse).then(objMediaset);
