var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    api,
    state;

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

function startCronJob() {
  var CronJob = require('cron').CronJob;
  new CronJob('28 1 * * *', function() {
    console.log('Turning of the lights');
    //TODO check if spotify or plex is playing
    api.lights().then(function(lightsObj) {
      lightsObj.lights.map(function(light) {
        turnOffLight(light.id);
      });
    }).done();
    }, null, true);
}

function turnOffLight(lightId) {
  state = lightState.create().off();
  setLightState(lightId, state);
}

function turnOnLight(lightId) {
  state = lightState.create().on();
  setLightState(lightId, state);

}

function setLightState(lightId, state) {
  api.setLightState(lightId, state)
      .then(displayResult)
      .done();
}

function createRandomColor() {
  return Math.floor(Math.random() * 255);
}

function createDisco(lightId) {

}

module.exports = {

  init: function() {
    var hostname = "10.0.1.2",
        username = "newdeveloper";
    api = new HueApi(hostname, username);
  },

  turnOffLight: function(lightId) {
    turnOffLight(lightId);
  },

  turnOnLight: function(lightId) {
    turnOnLight(lightId);
  },

  startDisco: function(lightArr) {
    function disco() {
      var r = createRandomColor();
      var g = createRandomColor();
      var b = createRandomColor();

      state = lightState.create().on().rgb(r,g,b);
      //
      // // --------------------------
      // // Using a promise
      api.setLightState(4, state)
          .then(displayResult)
          .done();

    }
    setInterval(function() {
      disco();
    },200);
  }


}
