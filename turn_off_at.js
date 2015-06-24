var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

var hostname = "10.0.1.2",
    username = "newdeveloper",
    api,
    state;

api = new HueApi(hostname, username);

var CronJob = require('cron').CronJob;
new CronJob('28 1 * * *', function() {
  console.log('Turning of the lights');
  //TODO check if spotify or plex is playing...
  api.lights().then(function(lightsObj) {
    lightsObj.lights.map(function(light) {
      turnOffLight(light.id);
    });
  }).done();
  }, null, true);


function turnOffLight(lightId) {
  state = lightState.create().off();
  api.setLightState(lightId, state)
      .then(displayResult)
      .done();
}
