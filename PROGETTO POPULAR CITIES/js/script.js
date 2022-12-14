import { qs, ce, GET, DELETE } from "./utils.js";

const BASE_URL = "https://api.musement.com/api/v3/cities";
const container = qs(".container");
const inputEl = qs(".search");
let inputValue = "";
let citiesList = [];

/*CREAZIONE CARD*/

const createCard = (data) => {
  const { cover_image_url, name, content } = data;

  const cardEl = ce("div");
  const imgCity = ce("img");
  const titleCity = ce("h2");
  const mostraText = ce("button");
  const urlCity = ce("p");

  cardEl.className = "card";
  imgCity.className = "card__img";
  imgCity.setAttribute("src", cover_image_url);
  imgCity.setAttribute("alt", name);
  titleCity.textContent = name;
  titleCity.className = "card__title";
  mostraText.className = "btn_text";
  mostraText.textContent = "Mostra Tutto";
  urlCity.className = "card__text";
  urlCity.textContent = content;

  cardEl.append(imgCity, titleCity, mostraText, urlCity);
  container.append(cardEl);
};
/*CREO LE CARD USANDO LA GET E CON L'INPUT LE FILTRO*/

GET(BASE_URL).then((data) => {
  citiesList = data;
  citiesList.map((i) => createCard(i, container));
});

inputEl.addEventListener("input", (e) => {
  console.log(citiesList);
  const searchString = e.target.value;

  container.replaceChildren();
  citiesList
    .filter((prod) =>
      prod?.name.toLowerCase().includes(searchString.toLowerCase())
    )
    .map((product) => createCard(product, container));
});
/*FUNZIONE CITTA PIU POPOLARI*/

function removeAllChildNodes(parent) {
  if (parent.Child) {
    parent.removeChild(parent.Child);
  }
}

console.log(" PRE IF", container.children);
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  container.innerHtml = "";
  console.log(submit.value);

  if (submit.value === "Mostra popolari") {
    submit.value = "Mostra tutte";
    //console.log("IF", container.children);
    removeAllChildNodes(container);
    //console.log("IF  POST", container.children);
    //citiesList = [];

    GET(BASE_URL).then((data) => {
      citiesList = data.filter((city) => city.show_in_popular === true);
      citiesList.map((city) => createCard(city, container));
      console.log(citiesList.length);
    });
  } else {
    submit.value = "Mostra popolari";
    //console.log("ELSE", container.children);
    removeAllChildNodes(container);
    // console.log("ELSE POST", container.children);
    //citiesList = [];
    GET(BASE_URL).then((data) => {
      citiesList = data;
      citiesList.map((city) => createCard(city, container));
      console.log(citiesList.length);
    });
  }
});
let panel = document.querySelector(".card__text");
let item = document.querySelector(".btn_text");
panel.addEventListener("click", function () {
  item.classList.toggle("active");
});

/*MODALE*/

/*const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("container");

open.addEventListener("click", () => {
  modal.classList.add("active");
});

close.addEventListener("click", () => {
  modal.classList.remove("active");
});

/*DARK MODE*/

const toggle = document.getElementById("toggle");
toggle.addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});
