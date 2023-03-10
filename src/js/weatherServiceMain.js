import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
let buttonWeatherForWeek = null;
let buttonWeatherForToday = null;
let weeklyWeatherBlock = null;
let todayWeatherBlock = null;
let weatherForWeekListener = null;
let weatherForTodayListener = null;
let actualLocation = { lat: 39.8865, lon: -83.4483 };
const currentTimestamp = new Date();
let weatherTimestamp = currentTimestamp.getTime();

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

function hideBlock(htmlObj) {
  htmlObj.classList.add('is-hidden');
}
function showBlock(htmlObj) {
  htmlObj.classList.remove('is-hidden');
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

  const rawDataDay = getDemoWeather(actualLocation); //request is here
  const rawDataWeek = getDailyWeather(actualLocation); //request is here
  const sityNameData = getDetailLocation(actualLocation); //detail location

  const a = Promise.all([rawDataDay, rawDataWeek, sityNameData])
    .then(value => {
      return value;
    })
    .catch(error => Notify.failure('Free request limit')());

  a.then(result => {
    const [query1, query2, query3] = result;
    parsedData.temperature = query1.current.temp;
    parsedData.description = query1.current.weather[0].main;
    parsedData.iconCode = query1.current.weather[0].icon;
    parsedData.sityName = query3[0].name;
    weatherInsertionPoint.innerHTML = ''; //clear the default weather block
    buildWeatherMarkup(weatherInsertionPoint, parsedData, weatherTimestamp);
    buildForecastMarkup(weatherInsertionPoint, query2, query3);
    weeklyWeatherBlock = document.querySelector('#weekly_weather_block');
    todayWeatherBlock = document.querySelector('#today_weather_block');
    buttonWeatherForWeek = document.querySelector('#weather_for_week');
    buttonWeatherForToday = document.querySelector('#weather_for_today');

    weatherForWeekListener = buttonWeatherForWeek.addEventListener(
      'click',
      obj => {
        showBlock(weeklyWeatherBlock);
      }
    );
    weatherForTodayListener = buttonWeatherForToday.addEventListener(
      'click',
      obj => {
        hideBlock(weeklyWeatherBlock);
      }
    );
  }).catch(error =>
    buildWeatherMarkup(weatherInsertionPoint, parsedData, weatherTimestamp)
  );
}

export { insertWeatherBlock };
async function userPositionConsent() {
  return navigator.geolocation.getCurrentPosition(r => {
    actualLocation.lat = r.coords.latitude;
    actualLocation.lon = r.coords.longitude;
    weatherTimestamp = r.timestamp;

    insertWeatherBlock(
      wetherButtonState,
      weatherInsertionPoint,
      actualLocation,
      weatherTimestamp
    );
  });
}
function weatherMarkup() {
  insertWeatherBlock(
    wetherButtonState,
    weatherInsertionPoint,
    actualLocation,
    weatherTimestamp
  );
}

export { userPositionConsent, weatherMarkup, secondsToString };
