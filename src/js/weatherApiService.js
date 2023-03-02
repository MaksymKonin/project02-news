const WEATHER_API_KEY = '19831cf247bc3b5af5cfecb7de987016';
const WEATHER_SOURCE = 'https://api.openweathermap.org/data/3.0/onecall';
const userLatitude = 39.8865;
const userLongitude = -83.4483;

import axios from 'axios';
// import { getPosition } from './locationApiService.js';

const queryOptions = {
  key: WEATHER_API_KEY,
  latitude: userLatitude,
  longitude: userLongitude,
  dailyOption: 'current,minutely,hourly,alerts',
  currentOption: 'minutely,hourly,daily,alerts',
  units: 'metric',
};

async function getCurrentWeather(position) {
  const colectedURL = `${WEATHER_SOURCE}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=${queryOptions.currentOption}&appid=${queryOptions.key}&units=${queryOptions.units}`;

  return axios.get(colectedURL);
}

async function getDailyWeather(lat, lon) {
  const colectedURL = `${WEATHER_SOURCE}?lat=${queryOptions.latitude}&lon=${queryOptions.longitude}&exclude=${queryOptions.dailyOption}&appid=${queryOptions.key}`;

  return axios.get(colectedURL);
}

async function getDemoWeather() {
  const colectedURL = `${WEATHER_SOURCE}?lat=${queryOptions.latitude}&lon=${queryOptions.longitude}&exclude=${queryOptions.currentOption}&units=${queryOptions.units}&appid=${queryOptions.key}`;
  return axios.get(colectedURL).then(r => r.data);
}

export { getCurrentWeather, getDailyWeather, getDemoWeather };

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// function collectPosition() {
//   navigator.geolocation.getCurrentPosition(r => {
//     const obj = { lat: r.coords.latitude, lon: r.coords.longitude };
//     console.log('this is obj', obj);
//   });
// }
// export { collectPosition, getCurrentPosition };

// function getCurrentPosition() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       position => resolve(position),
//       error => reject(error)
//     );
//   });
// }
