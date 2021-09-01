const API_KEY = '6c03c1b0e967448eb33d601dc66c9100';
const BASE_URL = 'https://newsapi.org/v2';
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewsApiService {
  // этот класс или его экземпляры будут отвечать за запросы на API
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  // метод отвечает за HTTP запросы
  fetchArticles() {
    // console.log('До запроса: ', this);

    // пагинация
    // (названия параметров для каждого бэкенда могут отличаться, нужнос мотреть в доках)
    // pageSize=5 - выдаст 5шт в результате поиска
    // page=2 - выдаст вторые 5шт элементов
    const url = `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(response => response.json())
      .then(({ articles }) => {
        // console.log(data);

        this.incrementPage();
        // console.log(this);

        // console.log('После запроса, если все ок: ', this);

        return articles;
      });
  }

  // увеличение страницы
  incrementPage() {
    this.page += 1;
  }

  // сброс страницы
  resetPage() {
    this.page = 1;
  }

  get query() {
    //   query - хранит сервис, котор отвечает за раб с API, а не внешний код
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
