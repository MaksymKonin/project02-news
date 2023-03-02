import {
  getCurrentWeather,
  getDailyWeather,
  getDemoWeather,
} from './weatherApiService';

function insertWeatherBlock(wetherButtonState, weatherInsertionPoint) {
  // console.log('rendering...');
  // console.log('rendering...', wetherButtonState);
  // console.log('rendering...', weatherInsertionPoint);

  if (wetherButtonState === true) {
    //single req
    console.log('single');
    const resultArray = getDemoWeather();
    resultArray.then(r => {
      console.log(r);
      console.log(r.current);
      console.log(r.current.weather[0]);
      console.log('------------------------------');
      console.log('area name:', r.timezone);
      console.log('temperature', r.current.temp);
      console.log('description:', r.current.weather[0].main);
      console.log('icon:', r.current.weather[0].icon);
    });
  } else {
    //multiple req
    console.log('multiple');
  }
}

// async function performQuery(wetherButtonState) {
//   try {
//     const geoPosition = await getCurrentPosition();
//     console.log('async result is', geoPosition);
//     return geoPosition;
//   } catch (error) {}
// }

// async function getCurrentPosition() {
//   return navigator.geolocation.getCurrentPosition(
//     successPosition,
//     alternativeGeo
//   );
// }

// // const requestResult = getCurrentPosition();

// // console.log('результат', requestResult);

// function alternativeGeo(error) {
//   console.log('ошибка здесь', error);
//   const a = error;
//   return a;
// }
// function successPosition(position) {
//   console.log('успех', position);
//   // collectPosition(position.coords.latitude, position.coords.longitude);
//   const a = position;
//   return a;
// }
// console.log('script continue');

export { insertWeatherBlock };
