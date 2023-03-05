const WEATHER_API_KEY = '25520672b86a16972f62ac80defff3d9';
const WEATHER_SOURCE = 'https://api.openweathermap.org/data/3.0/onecall';
const WEATHER_REVERSE = 'https://api.openweathermap.org/geo/1.0/reverse';

import axios from 'axios';
// import { getPosition } from './locationApiService.js';

const queryOptions = {
  key: WEATHER_API_KEY,
  dailyOption: 'current,minutely,hourly,alerts',
  currentOption: 'minutely,hourly,daily,alerts',
  units: 'metric',
};

async function getDailyWeather({ lat, lon }) {
  const weatherURL = `${WEATHER_SOURCE}?lat=${lat}&lon=${lon}&exclude=${queryOptions.dailyOption}&units=${queryOptions.units}&appid=${queryOptions.key}`;

  return axios.get(weatherURL).then(r => r.data);
}

async function getDemoWeather({ lat, lon }) {
  const weatherURL = `${WEATHER_SOURCE}?lat=${lat}&lon=${lon}&exclude=${queryOptions.currentOption}&units=${queryOptions.units}&appid=${queryOptions.key}`;

  return axios.get(weatherURL).then(r => r.data);
}

async function getDetailLocation({ lat, lon }) {
  const weatherURL = `${WEATHER_REVERSE}?lat=${lat}&lon=${lon}&limit=1&appid=${queryOptions.key}`;

  return axios.get(weatherURL).then(r => r.data);
}

export { getDailyWeather, getDemoWeather, getDetailLocation };
