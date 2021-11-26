// Récupération des éléments du DOM
const villeInput = document.querySelector("input#ville");
const form = document.querySelector("form");
const resultatsDiv = document.querySelector("div#resultats");

// Resigner l'API key ici
const apiKey = "";
const baseUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric";
// Logique

/**
 * Contacte l'API pour obtenir la météo d'une ville
 * @param {string} ville nom de la ville
 */
const rechercherMeteo = () => {
  let ville = villeInput.value;
  fetch(`${baseUrl}&appid=${apiKey}&q=${ville}`)
    .then((resp) => resp.json())
    .then((resultat) => {
      resultat.list.forEach((jour) => {
        resultatsDiv.innerHTML = '';
        createCard(jour, resultatsDiv);
      });
    })
    .catch((erreur) => {
      console.error(erreur);
    });
};

// Construction des cartes
// const createCard = (meteoDuJour) => {
//     let meteoCard = document.createElement('div');
//     meteoCard.setAttribute('class','meteo-card');
//     meteoCard.innerHTML =  `
//     <div class="card-header">
//         <h2 class="center">${meteoDuJour.dt_txt}</h2>
//         <div class="colone">
//             <p>${meteoDuJour.weather[0].description}</p><img class="meteo-icon" src="" alt="${meteoDuJour.weather[0].description}">
//         </div>
//         <p class="center">${meteoDuJour.main.temp}°C</p>
//     </div>
//     <div class="card-body colone">
//         <div>
//             <ul>
//                 <li>Temp ressentie: ${meteoDuJour.main.feels_like}°C</li>
//                 <li>Temp Max: ${meteoDuJour.main.temp_max}°C</li>
//                 <li>Temp Min: ${meteoDuJour.main.temp_min}°C</li>
//             </ul>
//         </div>
//         <div>
//             <ul>
//                 <li>Vitesse du vent: ${meteoDuJour.wind.speed} km/h</li>
//                 <li>Orientation du vent: ${meteoDuJour.main.temp}</li>
//                 <li>Humidité: ${meteoDuJour.main.temp}</li>
//             </ul>
//         </div>
//     </div>
// `;
//     resultatsDiv.appendChild(meteoCard);
// };

/**
 * 
 * @param {Meteo} meteoDuJour l'objet contenant la météo pour 3 h
 * @param {HTMLDivElement} noeud Le noeud DOM sur lequel inserer la carte
 */
const createCard = (meteoDuJour, noeud) => {
  let meteoCard = document.createElement("div");
  meteoCard.setAttribute("class", "meteo-card");

  let cardHeader = document.createElement("div");
  cardHeader.setAttribute("class", "card-header");

  cardHeader.innerHTML = `<div class="card-header">
        <h2 class="center">${meteoDuJour.dt_txt}</h2>
        <div class="colone">
            <p>${meteoDuJour.weather[0].description}</p><img class="meteo-icon" src="" alt="${meteoDuJour.weather[0].description}">
        </div>
        <p class="center">${meteoDuJour.main.temp}°C</p>
    </div>`;
    meteoCard.appendChild(cardHeader);
  noeud.appendChild(meteoCard);
};

// Gestion des événements

form.addEventListener("submit", (event) => {
  // on annule le comportement par défault d'HTML qui redirige à la soummission d'un formulaire
  event.preventDefault();
  // on lance la recherche
  rechercherMeteo();
});
