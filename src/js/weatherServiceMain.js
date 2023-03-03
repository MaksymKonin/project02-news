//import weather module:
import { insertWeatherBlock } from './renderWeather';

//basic weather setup
let wetherButtonState = true;
let weatherInsertionPoint = document.querySelector('.weather__card');
let actualLocation = { lat: 39.8865, lon: -83.4483 };
const currentTimestamp = new Date();
let weatherTimestamp = currentTimestamp.getTime();

//weather user consent (popup location prompt)
async function userPositionConsent() {
  return navigator.geolocation.getCurrentPosition(r => {
    // console.log(r);
    actualLocation.lat = r.coords.latitude;
    actualLocation.lon = r.coords.longitude;
    weatherTimestamp = r.timestamp;
    weatherInsertionPoint.innerHTML = ''; //clear the default weather block

    insertWeatherBlock(
      wetherButtonState,
      weatherInsertionPoint,
      actualLocation,
      weatherTimestamp
    );
  });
}

//   !!!!!  insert weather markup:
// run } weatherMarkup { as callback in your markUp

//button state 'true' - one day weather, 'false' - week.
//insertion point - HTML node.
// This script add markup to this node: const insertionPoint = document.querySelector('___some_selector___');
//run insertWeatherBlock(true, weatherInsertionPoint); in the begining
//run insertWeatherBlock(true, weatherInsertionPoint); as click on button

//weather test buttons and functions

// const buttonTest = document.querySelector('#test');
// console.log(buttonTest);
// buttonTest.addEventListener('click', callBack);

// const buttonTestWeatherReq = document.querySelector('#sendWeatherReq');
// console.log(buttonTestWeatherReq);
// buttonTestWeatherReq.addEventListener('click', weatherMarkup);

// function callBack() {
//   console.log(
//     'current coordinates:',
//     actualLocation,
//     'and time:',
//     weatherTimestamp
//   );
// }
function weatherMarkup() {
  insertWeatherBlock(
    wetherButtonState,
    weatherInsertionPoint,
    actualLocation,
    weatherTimestamp
  );
}

//+++Imported from render++++++++++++++++++++++++++++++

//+++END+++++

export { userPositionConsent, weatherMarkup };
