var HueUtil = require('./utils/hue.util');

HueUtil.init();

HueUtil.turnOnLight(4);

HueUtil.startDisco();

// --------------------------
// Using a promise
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
//
//
// function disco() {
//   var r = createRandomColor();
//   var g = createRandomColor();
//   var b = createRandomColor();
//   // Set light state to 'on' with warm white value of 500 and brightness set to 100%
//   state = lightState.create().on().rgb(r,g,b);
//   //
//   // // --------------------------
//   // // Using a promise
//   api.setLightState(4, state)
//       .then(displayResult)
//       .done();
//
// }
// // setInterval(function() {
// //   disco();
// // },200);
//
// function createRandomColor() {
//   return Math.floor(Math.random() * 255);
// }
