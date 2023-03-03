import createCalendar from './js/renderCalendar';
import { userPositionConsent, weatherMarkup } from './js/weatherServiceMain';

createCalendar();

//run default weather
weatherMarkup();
//run weather according to location
userPositionConsent();
