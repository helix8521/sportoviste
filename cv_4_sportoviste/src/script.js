// API load
const queryURL = "https://services5.arcgis.com/UbiPR9eAyIWvC8EM/arcgis/rest/services/SportovisteMSK_data_geocoded/FeatureServer/0/query";
//nastaveni hlavicky
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
//nastaveni tela pozadavku
var urlencoded = new URLSearchParams();
urlencoded.append("f", "JSON");
urlencoded.append("where", "1 = 1");
urlencoded.append("outFields", "*");
//nastaveni pozadavku
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};


// ulozeni dat do noveho pole

let zaznamBox = document.getElementById("zaznamBox")

// Načtení dat pomocí funkce fetchDataAwait a zpracování výsledků
const data = fetchDataAwait(queryURL, requestOptions).then(async function (result) {
  // Pro každý prvek ve výsledku vytvoříme nový div s informacemi
  await result.forEach(async element => {
    // Získání atributů z prvku
    const nazev = element.attributes.Nazev_zarizeni
    const adr = element.attributes.Adresa
    const infoLink = element.attributes.More_info
    
    // Vytvoření nového divu s HTML obsahem
    const divNew = document.createElement("div");
    divNew.innerHTML =
      `<div class="feature col">
          <h2>${nazev}</h2>
          <p>${adr}</p>
          <a href="${infoLink}" class="icon-link">
            Odkaz na oficialni stranky
          </a>
        </div>`
    // Přidání divu do kontejneru zaznamBox
    zaznamBox.appendChild(divNew);
  });
})


