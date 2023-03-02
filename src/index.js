//import weather module:
import { insertWeatherBlock } from './js/renderWeather';
let wetherButtonState = true;
let weatherInsertionPoint = document.querySelector('body');
//insert weather markup:
insertWeatherBlock(wetherButtonState, weatherInsertionPoint);
//button state 'true' - one day weather, 'false' - week.
//insertion point - HTML node.
// This script add markup to this node: const insertionPoint = document.querySelector('___some_selector___');
//run insertWeatherBlock(true, weatherInsertionPoint); in the begining
//run insertWeatherBlock(true, weatherInsertionPoint); as click on button
