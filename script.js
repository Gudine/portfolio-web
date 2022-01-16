let lang = 'pt';

let langData;
fetch('lang.json')
  .then((response) => response.json())
  .then((data) => langData = data);

const menubars = document.querySelector('.menubars');
const dropdown = document.querySelector('.dropdown');
const langBtns = [...document.querySelectorAll('.lang div')];

document.body.addEventListener('click', () => {
  menubars.classList.remove('active');
});
dropdown.addEventListener('click', (ev) => {
  ev.stopPropagation();
});
menubars.addEventListener('click', (ev) => {
  menubars.classList.toggle('active');
  ev.stopPropagation();
});

langBtns.forEach((btn) => btn.addEventListener('click', changeLang))

function updateGroupLang(group, elems) {
  for (let i = 0; i < elems.length; i += 1) {
    if (langData[lang][group][i] === null) {
      elems[i].innerHTML = langData['pt'][group][i];
    } else {
      elems[i].innerHTML = langData[lang][group][i];
    }
  }
}

function updateProjectsAlt() {
  const projects = [...document.querySelectorAll('.projectsgrid section')];
  for (const proj of projects) {
    const name = proj.children[0].children[0].children[1].innerText;
    proj.children[2].children[0].children[0].alt = name;
  }
}

function updateIcons() {
  [...document.querySelectorAll('figcaption i')].forEach((elem) => {
    elem.title = langData[lang]['icons'][elem.classList[1].slice(3)];
    elem.nextElementSibling.innerText = langData[lang]['icons'][elem.classList[1].slice(3)];
  });
  [...document.querySelectorAll('.trybe')].forEach((elem) => {
    elem.alt = langData[lang]['icons']['trybe'];
    elem.title = langData[lang]['icons']['trybe'];
  });
}

function updateLang() {
  const headers = [...document.querySelectorAll('h1, h2, h3, .subtitle')];
  const toc = [...document.querySelectorAll('.dropdown a')];
  const content = [...document.querySelectorAll('.textblock p')];

  updateGroupLang('headers', headers);
  updateGroupLang('toc', toc);
  updateGroupLang('content', content);

  updateProjectsAlt();
  updateIcons();
}

function changeLang(ev) {
  const newLang = ev.target.innerText.toLowerCase();
  if (newLang != lang) {
    lang = newLang;
    updateLang();
  }
}