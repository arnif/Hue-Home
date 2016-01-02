var q = require('q');
var hue = require("node-hue-api"),
    HueApi = hue.HueApi,
    lightState = hue.lightState,
    api,
    state,
    intervalId;

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

function getAllLights() {
  var deferred = q.defer();
  api.lights()
      .then(function(lights) {
      if (lights) {
        deferred.resolve(lights);
      }
  })
  .fail(function(err) {
    deferred.reject({error: err});
  })
  .done();

  return deferred.promise;
}

function getFullState() {
  var deferred = q.defer();
  api.getFullState()
      .then(function(lights) {
      if (lights) {
        deferred.resolve(lights);
      }
  })
  .fail(function(err) {
    deferred.reject({error: err});
  })
  .done();

  return deferred.promise;
}

function turnOffLight(lightId) {
  state = lightState.create().off();
  return setLightState(lightId, state);
}

function turnOnLight(lightId) {
  state = lightState.create().on(); //TODO brightness ??
  return setLightState(lightId, state);
}

function setLightState(lightId, state) {
  var deferred = q.defer();
  api.setLightState(lightId, state)
      .then(function(results) {
        deferred.resolve(results);
      })
      .fail(function(err) {
        deferred.reject(err);
      })
      .done();

  return deferred.promise;
}

function createRandomColor() {
  return Math.floor(Math.random() * 255);
}


module.exports = {

  init: function() {
    var hostname = "10.0.1.2",
        username = "newdeveloper";
    api = new HueApi(hostname, username);
  },

  getAllLights: getAllLights,

  getFullState: getFullState,

  turnOnAllLights: function() {
    getAllLights().then(function(lightsObj) {
      lightsObj.lights.map(function(light) {
        turnOnLight(light.id);
      });
    });
  },

  turnOffAllLights: function() {
    getAllLights().then(function(lightsObj) {
      lightsObj.lights.map(function(light) {
        turnOffLight(light.id);
      });
    });
  },

  turnOffLight: function(lightId) {
    var deferred = q.defer();
    turnOffLight(lightId).then(function(results) {
      deferred.resolve(results);
    });
    return deferred.promise;
  },

  turnOnLight: function(lightId) {
    var deferred = q.defer();
    turnOnLight(lightId).then(function(results) {
      deferred.resolve(results);
    });
    return deferred.promise;
  },

  startDisco: function(lightArr) {
    function disco(lightId) {
      var r = createRandomColor();
      var g = createRandomColor();
      var b = createRandomColor();

      state = lightState.create().on().rgb(r,g,b);
      //
      // // --------------------------
      // // Using a promise
      api.setLightState(lightId, state)
          .then()
          .done();

    }
    if (!intervalId) {
      intervalId = setInterval(function() {
        disco(4);
        disco(8);
      },200);
    } else {
      this.stopDisco();
    }

  },

  stopDisco: function() {
    clearInterval(intervalId);
    intervalId = false;
  }


}
