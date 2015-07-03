
jest.autoMockOff();
jest.dontMock('../hue.util.js');
jest.genMockFromModule('node-hue-api').HueApi;

//TODO write tests!

describe('hue util', function() {

 //  pit('Spec 1', function() {
 //   return funcThatReturnsPromise().then(function(stuff) {
 //     expect(stuff).toBe(stuff_i_expect_it_to_be);
 //   });
 // });


 it('should turn on light', function() {
   var hueUtil = require('../hue.util');


  //  hueUtil.init();

  //  return hueUtil.turnOnLight(1).then(function(result) {
  //    expect(result).toBe(false);
  //  });

   expect(41).toBe(41);

 });
});
