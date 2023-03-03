import {
  getDailyWeather,
  getDemoWeather,
  getDetailLocation,
} from './weatherApiService';

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

  const string = `<div style="background-color: yellow; width: 150px; height: 300px;">
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
  const string = `<div style="background-color: blue; width: 150px; height: 300px;"><p>forecast for ${query2[0].name}</p><ul>${daysString}</ul><button class="weather-button">weather for today</button></div>`;

  weatherInsertionPoint.insertAdjacentHTML('beforeend', string);
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
