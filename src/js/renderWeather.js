import { secondsToString } from './weatherServiceMain.js';

function createDateString(obj) {
  return `<div>${obj.dayOfWeek}</div><div>${obj.dayOfMonth} ${obj.monthName} ${obj.year}</div>`;
}

function createForecastDateString(obj) {
  return `<span>${obj.dayOfWeek},${obj.dayOfMonth} ${obj.monthName} </span>`;
}

function buildWeatherMarkup(
  weatherInsertionPoint,
  parsedData,
  weatherTimestamp
) {
  const getTimeObj = secondsToString(weatherTimestamp);
  const timeString = createDateString(getTimeObj);

  const string = `<div id="today_weather_block" class="weather__card__container current_weather">
  <p><span class="weathere-city-name">${parsedData.sityName}</span></p>
  <p><span class="weathere-temperature">${parsedData.temperature}&#176C</span></p>
  <p><span class="weathere-description">${parsedData.description}</span></p>
  <img class="weathere-icon"src="http://openweathermap.org/img/wn/${parsedData.iconCode}@2x.png" alt="Weather icon" >
  ${timeString}
<button id="weather_for_week" class="weather-button">weather for week</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

function buildForecastMarkup(weatherInsertionPoint, query1, query2) {
  const daysString = query1.daily
    .map(value => {
      return `<li>${createForecastDateString(
        secondsToString(value.dt)
      )}<span>${Math.round(value.temp.min)} / ${Math.round(
        value.temp.max
      )}   </span><img style="height: 30px;" class="weathere-icon"src="http://openweathermap.org/img/wn/${
        value.weather[0].icon
      }@2x.png" alt="Weather icon" > </li>`;
    })
    .join('');
  const string = `<div id="weekly_weather_block" class="weather__card__container weekly_weather is-hidden"><p>forecast for ${query2[0].name}</p><ul>${daysString}</ul><button id="weather_for_today" class="weather-button">weather for today</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

export {
  createDateString,
  createForecastDateString,
  buildWeatherMarkup,
  buildForecastMarkup,
};
