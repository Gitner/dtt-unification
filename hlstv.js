const express = require('express'),
      path = require('path'),
      dmxr = require('./demux_rai.js'),
      dmxm = require('./demux_mediaset.js'),
      dmxd = require('./demux_discovery.js'),
      dmxt = require('./demux_tv8.js'),
      dmxv = require('./demux_viacom.js'),
      app = express(),
      fs = require('fs'),
      objRai = JSON.parse(fs.readFileSync('rai.json'));
      objMediaset = JSON.parse(fs.readFileSync('mediaset.json'));
      objDiscovery = JSON.parse(fs.readFileSync('discovery.json'));
      objViacom = JSON.parse(fs.readFileSync('viacom.json'));
      json = Object.assign({}, objRai, objMediaset, objDiscovery, objViacom);

// Express Middleware for serving static files
app.use(express.static(__dirname));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('../index', { lcn: 1 });
});

app.get('/:lcn', function(req, res) {
  res.render('../index', { lcn: req.params.lcn });
});

app.get('/rai/:ch', async (req, res) => {
  res.send(await dmxr.rai(json[decodeURI(req.params.ch)]));
});

app.get('/mediaset/:ch', async (req, res) => {
  res.send(await dmxm.mediaset(json[decodeURI(req.params.ch)]));
});

app.get('/discovery/:ch', async (req, res) => {
  res.send(await dmxd.discovery(json[decodeURI(req.params.ch)]));
});

app.get('/tv8/:ch', async (req, res) => {
  res.send(await dmxt.tv8(decodeURI(req.params.ch)));
});

app.get('/viacom/:ch', async (req, res) => {
  res.send(await dmxv.viacom(json[decodeURI(req.params.ch)]));
});

app.listen(80);
