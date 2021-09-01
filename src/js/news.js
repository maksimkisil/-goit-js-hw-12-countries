import articlesTpl from '../templates/news-service.hbs';
import NewsApiService from './news-service';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector("[data-action='load-more']"),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// что бы получить объект с методами и свойствами в результате
const newsApiService = new NewsApiService();

function onSearch(e) {
  e.preventDefault();

  // searchQuery - термин запроса - взяли форму, в ней свойство elements, в нем свойство query - ссылка на инпут, и у него свойство value
  // при сабмите формы сохранять значение - текущий термин запроса
  // при сабмите формы на объект newsApiService в его свойство searchQuery(в классе в constructor) при помощи сеттера записали то, что мы из форм получаем. поэтому при кажд след запросе у него в свойство searchQuery будет сохранено
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  // спинер показан, идет загрузка, кнопка не активна
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  // newsApiService.fetchArticles().then(articles => {
  //   clearArticlesContainer();
  //   appendArticlesMarkup(articles);

  fetchArticles();
}
refs.searchForm.addEventListener('submit', onSearch);

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);

    // прячет спинер, кнопка активна
    loadMoreBtn.enable();
  });
}
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

// ----------------------------------------------------------------------------
// функция работы с API и функция отрисовки и реагирования на интерфейс - разные. функция которая что-то забирает и функция которая что-то рисует и обрабатывает - должны быть разными функциями. (макароны если делать все в одной функции)
