var HueUtil = require('./utils/hue.util');

var express = require('express');
var app = express();

HueUtil.init();

app.get('/', function(req, res) {
  HueUtil.getAllLights().then(function(response){
    res.json(response);
  });
});

app.get('/state', function(req, res) {
  HueUtil.getFullState().then(function(response){
    res.json(response);
  });
});

app.get('/on', function(req, res) {
  HueUtil.turnOnAllLights();
  return res.sendStatus(200);
});

app.get('/off', function(req, res) {
  HueUtil.turnOffAllLights();
  return res.sendStatus(200);
});

app.get('/on/:lightId', function(req, res) {

  var lightId = req.params.lightId;
  if (lightId) {
    HueUtil.turnOnLight(lightId).then(function(results) {
        return res.send(results);
    })
    .fail(function(err) {
      return res.send(err);
    });
  }

});

app.get('/off/:lightId', function(req, res) {

  var lightId = req.params.lightId;
  if (lightId) {
    HueUtil.turnOffLight(lightId).then(function(results) {
        return res.send(results);
    })
    .fail(function(err) {
        res.send(err);
    });
  }

});

app.get('/alert', function(req, res) {
  HueUtil.alertAllLights();
  return res.sendStatus(200);
});

app.post('/alert/:lightId', function(req, res) {
  var lightId = req.params.lightId;
  var short = req.query.short;
  if (lightId) {
    HueUtil.alertLight(lightId, short).then(function(results) {
        return res.send(results);
    })
    .fail(function(err) {
        res.send(err);
    });
  }
});

app.get('/disco/start', function(req, res) {
  HueUtil.startDisco();
  return res.sendStatus(200);
});

app.get('/disco/stop', function(req, res) {
  HueUtil.stopDisco();
  return res.sendStatus(200);
});

app.listen(3000);

// api.groups().then(displayResult).done();
// api.lights().then(displayResult).done();
//
//
//
// function createGroup(name, bulpArr) {
//   api.createGroup(name, bulpArr)
//       .then(displayResult)
//       .done();
// }
//
// // createGroup('stofa', [4,5]);
//
// state = lightState.create().on();
//
// // api.setGroupLightState(2, state)
// //     .then(displayResult)
// //     .done();
