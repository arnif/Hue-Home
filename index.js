var HueUtil = require('./utils/hue.util');

var express = require('express');
var app = express();

HueUtil.init();

app.post('/on', function(req, res) {
  HueUtil.turnOnAllLights();
  return res.sendStatus(200);
});

app.post('/off', function(req, res) {
  HueUtil.turnOffAllLights();
  return res.sendStatus(200);
});

app.post('/on/:lightId', function(req, res) {

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

app.post('/off/:lightId', function(req, res) {

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

app.post('/disco/start', function(req, res) {
  HueUtil.startDisco();
  return res.sendStatus(200);
});

app.post('/disco/stop', function(req, res) {
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
