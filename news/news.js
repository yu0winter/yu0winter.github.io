// NEWAPI 网站秘钥
// 账号 niuyulong1991@gmail.com
const Appkey = "64a2b432ba4e475091d80f3de19937b9";
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'Time';

window.addEventListener('load', e => {
    //	updateNews();
    //	updateSources();
    sourceSelector.addEventListener('change', evt => updateNews(evt.target.value));
    var loader = document.getElementsByClassName('loader')[0];
    loader.style.display = '';
    updateSources().then(() => {
        updateNews();
	    loader.style.display = 'none';
    });
});

window.addEventListener('online', () => updateNews(sourceSelector.value));

async function updateNews(source = defaultSource) {
    const res = await
    fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${Appkey}&sortBy=top`);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
    <div class="article">
      <a>
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
      </a>
    </div>
	`;
}

async function updateSources() {
    main.innerHTML = '';
    const res = await fetch(`https://newsapi.org/v2/sources?apiKey=${Appkey}`);
    const json = await res.json();
    sourceSelector.innerHTML = json.sources
        .map(src => `<option value="${src.id}">${src.name}</option>`).join('\n');
}