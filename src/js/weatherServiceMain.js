//import weather module:
import {
  createDateString,
  createForecastDateString,
  buildWeatherMarkup,
  buildForecastMarkup,
} from './renderWeather';

import {
  getDailyWeather,
  getDemoWeather,
  getDetailLocation,
} from './weatherApiService';

//basic weather setup
let wetherButtonState = true;
let weatherInsertionPoint = document.querySelector('.weather__card');
let weatherButtonInsertionPoint = null;
let weatherButtonEventListener = null;
// console.log(weatherButtonInsertionPoint);
let actualLocation = { lat: 39.8865, lon: -83.4483 };
const currentTimestamp = new Date();
let weatherTimestamp = currentTimestamp.getTime();

//+++Imported from render++++++++++++++++++++++++++++++

function secondsToString(seconds) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(seconds);
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return {
    dayOfWeek: dayOfWeek,
    dayOfMonth: dayOfMonth,
    monthName: monthName,
    year: year,
  };
  // return `<div>${dayOfWeek}</div><div>${dayOfMonth} ${monthName} ${year}</div>`;
}

async function insertWeatherBlock(
  wetherButtonState,
  weatherInsertionPoint,
  actualLocation,
  weatherTimestamp
) {
  //set default data obj
  let parsedData = {
    sityName: 'Timbuktu',
    temperature: '36.6',
    description: 'Always hot',
    iconCode: '01d',
    maxTemp: 100,
    minTemp: -100,
  };

  if (wetherButtonState === true) {
    //single req
    const rawData = getDemoWeather(actualLocation); //request is here
    const sityNameData = getDetailLocation(actualLocation); //detail location
    const a = Promise.all([rawData, sityNameData])
      .then(value => {
        return value;
      })
      .catch(error => console.log(error));

    a.then(result => {
      const [query1, query2] = result;
      parsedData.temperature = query1.current.temp;
      parsedData.description = query1.current.weather[0].main;
      parsedData.iconCode = query1.current.weather[0].icon;
      parsedData.sityName = query2[0].name;
      buildWeatherMarkup(weatherInsertionPoint, parsedData, weatherTimestamp);
    });
  } else {
    //multiple req

    const rawData = getDailyWeather(actualLocation); //request is here
    const sityNameData = getDetailLocation(actualLocation); //detail location
    const a = Promise.all([rawData, sityNameData])
      .then(value => {
        return value;
      })
      .catch(error => console.log(error));

    a.then(result => {
      const [query1, query2] = result;

      buildForecastMarkup(weatherInsertionPoint, query1, query2);
    });
  }
}

export { insertWeatherBlock };

//+++END+++++

//weather user consent (popup location prompt)
async function userPositionConsent() {
  return navigator.geolocation.getCurrentPosition(r => {
    // console.log(r);
    actualLocation.lat = r.coords.latitude;
    actualLocation.lon = r.coords.longitude;
    weatherTimestamp = r.timestamp;

    weatherInsertionPoint.innerHTML = ''; //clear the default weather block
    // weatherButtonInsertionPoint = document.querySelector('.weather-button');
    // weatherButtonEventListener

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

export { userPositionConsent, weatherMarkup, secondsToString };
