const BASE_URL = 'https://pokeapi.co/api/v2';

// функция возвращает результат фетча( - промис) с распарсенными данными
function fetchPokemon(pokemonId) {
  const url = `${BASE_URL}/pokemon/${pokemonId}`;

  return fetch(url).then(response => response.json());
}

export default { fetchPokemon };
