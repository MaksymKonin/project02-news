import { secondsToString } from './weatherServiceMain.js';

function createDateString(obj) {
  return `<div>${obj.dayOfWeek}</div><div>${obj.dayOfMonth} ${obj.monthName} ${obj.year}</div>`;
}

function createForecastDateString(obj) {
  return `<span>${obj.dayOfWeek}, ${obj.dayOfMonth} ${obj.monthName} </span>`;
}

function buildWeatherMarkup(
  weatherInsertionPoint,
  parsedData,
  weatherTimestamp
) {
  const getTimeObj = secondsToString(weatherTimestamp);
  const timeString = createDateString(getTimeObj);

  const string = `<div id="today_weather_block" class="weather__card__container current_weather">

  <div class="weather-burger-item top-item">
  <div class="weather-burger-item__left"><span class="weathere-temp">${Math.round(
    parsedData.temperature
  )}&#176</span></div>
<div class="weather-burger-item__right">
  <div class="weather-condition-container"><span class="weathere-condition">${
    parsedData.description
  }</span></div>
  <div class="weather-location-container"><span class="location-icon"></span><span class="weathere-description">${
    parsedData.sityName
  }</span></div>
  </div>

  </div>
    
  <div class="weather-burger-item"><div class="weather-image-container" style="background-image: url('http://openweathermap.org/img/wn/${
    parsedData.iconCode
  }@2x.png'); background-position: center; background-size: 120%;"></div>
  
  </div>
  
  <div class="weather-burger-item weathere-date">
  ${timeString}
  </div>
  
  <div class="weather-burger-item">
  <button id="weather_for_week" class="weather-button">weather for week</button>
  </div>


</div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

function buildForecastMarkup(weatherInsertionPoint, query1, query2) {
  const daysString = query1.daily
    .map(value => {
      return `<li>${createForecastDateString(
        secondsToString(value.dt * 1000)
      )}<span>${Math.round(value.temp.min)}&#176 / ${Math.round(
        value.temp.max
      )}&#176   </span><img class="weathere-icon"src="http://openweathermap.org/img/wn/${
        value.weather[0].icon
      }@2x.png" alt="Weather icon" > </li>`;
    })
    .join('');
  const string = `<div id="weekly_weather_block" class="weather__card__container weekly_weather is-hidden"><p>${query2[0].name}</p><ul>${daysString}</ul><button id="weather_for_today" class="weather-button">weather for today</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
}

export {
  createDateString,
  createForecastDateString,
  buildWeatherMarkup,
  buildForecastMarkup,
};
