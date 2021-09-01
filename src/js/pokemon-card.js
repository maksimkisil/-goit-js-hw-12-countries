// import '../css/pokemon-card.css';
import pokemonCardTpl from '../templates/pokemon-card.hbs';

// работа с бекендом
import API from './api-service';

// получение рефов
import getRefs from './get-refs';

const refs = getRefs();

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // console.log(form.elements);

  // значение инпута во время сабмита формы
  const searchQuery = form.elements.query.value;

  API.fetchPokemon(searchQuery)
    .then(renderPocemonCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}
refs.searchForm.addEventListener('submit', onSearch);

function renderPocemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  //   console.log(markup);

  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('404');
}

// ---------------------------------------------------------------
// квери стринг или параметры запроса
// pokemon?limit=100&offset=200

// mysite.com/api/pokemon?имяпараметра=значениепараметра&имяпараметра=значениепараметра
//  - начать строку запроса с ?(c знака вопроса)
//  - каждая пара разделяется &(амперсандом)
//  - имяпараметра=значениепараметра - это доп настройки вашего запроса
//  limit - позволяет забрать первое n-е количество покемонов, определяет лимит сколько можно забрать покемонов за раз

// fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
// fetch('https://pokeapi.co/api/?key=.........')
//   .then(r => r.json())
//   .then(console.log);

// указывая параметр запросы можно дополнительно настроить текущий запрос
// ---------------------------------------------------------------
// функция для каждого типа операции
// API, getRefs - разделение кода
// файл pokemon-cardю.js - работа с интерфейсом, все остальные части кода раскидать по отдельным файлам
