// handlebars
import countryCardTpl from '../templates/country-card.hbs';
import countryCardNameTpl from '../templates/country-card-name.hbs';

// lodash
var debounce = require('lodash.debounce');

// pnotify
import { defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import '@pnotify/core/dist/BrightTheme.css'; //color theme for error

defaultModules.set(PNotifyMobile, {});

// refs
// const formInputRef = document.querySelector('.form-input'); // др.вар. - очистка инпута
const inputRef = document.getElementById('input');
const cardContainerRef = document.getElementById('js-card-container');

function onInput(e) {
  e.preventDefault();

  const form = e.target.value; //запрос который вводят
  // console.log(inputRef.value === form);

  // if (form !== null) { // error
  if (form !== '') {
    fetchCountryName(form)
      .then(data => {
        renderManipulation(data);
      })
      .catch(err => console.error(err));
    // .finally(() => formInputRef.reset()); // др.вар. - очистка инпута
  }
}
inputRef.addEventListener('input', debounce(onInput, 500));
// formInputRef.addEventListener('input', debounce(onInput, 500)); // др.вар. - очистка инпута

// функция возвращает результат фетча( - прOмис) с распарсенными данными
function fetchCountryName(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

// render card with all info
function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  cardContainerRef.innerHTML = markup;
}

// render only name country
function renderCountryCardName(country) {
  const markup = countryCardNameTpl(country);
  cardContainerRef.innerHTML = markup;
}

// what markup to render
function renderManipulation(data) {
  if (data.length > 10) {
    error({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      delay: 2000,
    });
  } else if (data.length > 2 && data.length < 10) {
    renderCountryCardName(data);
  } else if (data.length === 1) {
    renderCountryCard(data);
  } else {
    error({
      title: `We didn’t find such a country.`,
      text: `Please check the correctness of the data entered and try again.`,
      delay: 2000,
    });
  }

  // switch ?
}

// --------------------------------------------------------------------------
// const a = fetch('https://restcountries.eu/rest/v2/name/ukraine');
// console.log(a);

/* ctrl+shift+/ */
