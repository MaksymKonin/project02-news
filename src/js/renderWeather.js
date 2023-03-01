import { collectPosition } from './weatherApiService';

function renderWeatherBlock() {
  console.log('rendering...');
}
export { renderWeatherBlock };

// import { collectPosition, getCurrentPosition } from './locationApiService.js';
// function showPosition(position) {
//   console.log(
//     'Latitude: ' +
//       position.coords.latitude +
//       ' Longitude: ' +
//       position.coords.longitude
//   );
// }
// getCurrentWeather();

// collectPosition();
// getCurrentPosition().then(r => console.log(r));
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    );
  });
}

getCurrentPosition().then(r => console.log(r));

//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(
//     value => {
//       console.log('onResolve call inside promise.then()');
//       console.log(value); // "Success! Value passed to resolve function"
//     },
//     // onReject will run third or not at all
//     error => {
//       console.log('onReject call inside promise.then()');
//       console.log(error); // "Error! Error passed to reject function"
//     }
//   );
