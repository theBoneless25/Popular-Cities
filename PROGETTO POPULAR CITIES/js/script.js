import { qs, ce, GET, DELETE } from "./utils.js";

const BASE_URL = "https://api.musement.com/api/v3/cities";
const container = qs(".container");
const inputEl = qs(".search");
let inputValue = "";
let citiesList = [];

const removeCards = () => {
  const cardContainer = document.querySelectorAll(".card");
  cardContainer.forEach((element) => {
    element.remove();
  });
};

/*CREAZIONE CARD*/

const createCard = (data) => {
  const { cover_image_url, name, content } = data;

  const cardEl = ce("div");
  const imgCity = ce("img");
  const titleCity = ce("h2");
  const urlCity = ce("p");
  const mostraText = ce("button");

  cardEl.className = "card";
  imgCity.className = "card__img";
  imgCity.setAttribute("src", cover_image_url);
  imgCity.setAttribute("alt", name);
  titleCity.textContent = name;
  titleCity.className = "card__title";
  urlCity.className = "card_text";
  urlCity.textContent = content;
  mostraText.className = "btn_text";
  mostraText.textContent = "Scopri di più";

  cardEl.append(imgCity, titleCity, urlCity, mostraText);
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

console.log(" PRE IF", container.children);
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(submit.value);

  if (submit.value === "Mostra tutte") {
    //console.log("IF", container.children);
    submit.value = "Mostra popolari";
    removeCards();
    //console.log("IF  POST", container.children);
    //citiesList = [];
    console.log(citiesList);

    GET(BASE_URL).then((data) => {
      citiesList = data;
      citiesList.map((city) => createCard(city, container));
      console.log("IF", citiesList.length);
    });
  } else {
    submit.value = "Mostra tutte";
    //console.log("ELSE", container.children);
    removeCards();
    // console.log("ELSE POST", container.children);
    //citiesList = [];
    GET(BASE_URL).then((data) => {
      citiesList = data.filter((city) => city.show_in_popular === true);
      citiesList.map((city) => createCard(city, container));
      console.log("ELSE", citiesList.length);
    });
  }
});

/*let panel = document.querySelector(".card_text");
let item = document.querySelector(".btn_text");
panel.addEventListener("click", function () {
  item.classList.toggle("active");
});*/

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
