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
const inputRef = document.getElementById('input');
const cardContainerRef = document.getElementById('js-card-container');

// при ошибка->ошибка->ошибка - что бы не падал код
function setError(data) {
  const now = new Date().valueOf();
  let endPoint = 0;

  if (now > endPoint) {
    endPoint = now + data.delay + 1000;
    return error(data);
  }
}

async function onInput(e) {
  e.preventDefault();
  const form = e.target.value.trim();

  try {
    const data = await fetchCountryName(form);
    renderManipulation(data);
  } catch (error) {
    console.log(error);
  }

  // if (form !== '') {
  //   fetchCountryName(form)
  //     .then(data => {
  //       renderManipulation(data);
  //     })
  //     .catch(e => console.log(e.name + ': ' + e.message));
  // }
}
inputRef.addEventListener('input', debounce(onInput, 500));

// функция возвращает результат фетча( - прOмис) с распарсенными данными
async function fetchCountryName(name) {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
  if (!response.ok) {
    return new Error('Country not found');
  }

  const names = response.json();
  return names;
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
    cardContainerRef.innerHTML = '';

    setError({
      title: `Too many matches found.`,
      text: `We found ${data.length} countries. Please enter a more specific query!`,
      delay: 1000,
    });
  } else if (data.length > 2 && data.length < 10) {
    renderCountryCardName(data);
  } else if (data.length === 1) {
    renderCountryCard(data);
  } else {
    cardContainerRef.innerHTML = '';

    setError({
      title: `We didn’t find such a country.`,
      text: `Please check the correctness of the data entered and try again.`,
      delay: 1000,
    });
  }
}

// --------------------------------------------------------------------------
// если сложная синхронная операция - использовать async/await, если простая - использовать then.catch
// async/await нельзя использовать вне функции

// если вне функции нужно вызвать (например onInput) - onInput.then().catch

// async/await что бы сделать асинхронную функцию, если нужно внутри тела этой функции обрабатывать результаты синхронной операции, т.е. подождать пока она выполниться, а then/catch использовать вне тела функции, т.е. если вызвала функцию она возвращает прОмис и получить из нее результат ее прОмиса можно с помощью then/catch. а вот если вызвать функцию в другой функции, то эту др функцию сделать async, await пока первая выполниться и try/catch будет заменять then/catch
