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

  const string = `<div class="weather__card__container">
  <p><span class="weathere-city-name">${parsedData.sityName}</span></p>
  <p><span class="weathere-temperature">${parsedData.temperature}&#176C</span></p>
  <p><span class="weathere-description">${parsedData.description}</span></p>
  <img class="weathere-icon"src="http://openweathermap.org/img/wn/${parsedData.iconCode}@2x.png" alt="Weather icon" >
  ${timeString}
<button class="weather-button">weather for week</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

function buildForecastMarkup(weatherInsertionPoint, query1, query2) {
  const daysString = query1.daily
    .map(value => {
      return `<li><span>${createForecastDateString(
        secondsToString(value.dt)
      )}     ${Math.round(value.temp.min)} / ${Math.round(
        value.temp.max
      )}   <img style="height: 30px;" class="weathere-icon"src="http://openweathermap.org/img/wn/${
        value.weather[0].icon
      }@2x.png" alt="Weather icon" ></span> </li>`;
    })
    .join('');
  const string = `<div class="weather__card__container"><p>forecast for ${query2[0].name}</p><ul>${daysString}</ul><button class="weather-button">weather for today</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

export {
  createDateString,
  createForecastDateString,
  buildWeatherMarkup,
  buildForecastMarkup,
};
