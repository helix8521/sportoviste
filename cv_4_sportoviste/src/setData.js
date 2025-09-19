// URL pro přidání záznamů do ArcGIS Feature Server
const url_add_records = "https://services5.arcgis.com/UbiPR9eAyIWvC8EM/arcgis/rest/services/SportovisteMSK_data_geocoded/FeatureServer/0/addFeatures"

// Výběr formuláře a přidání event listeneru pro submit
let form = document.forms["data-form"];

form.addEventListener("submit", getValues);

// Výběr tlačítka pro odeslání a logování
submitButton = document.getElementById("button-submit")
console.log(submitButton)

// Funkce pro získání hodnot z formuláře a odeslání dat
function getValues(event) {
    event.preventDefault();

    // Získání dat z formuláře
    let data = {
        "name": this.nazev.value,
        "adresa": this.adresa.value,
        "url": this.url.value,
        "typ": this.typS.value,
        "long": this.inputLong.value,
        "lat": this.inputLat.value
    }

    console.log(data)

    // Vytvoření objektu feature pro aktualizaci
    const featureToUpdate = {
        "geometry": {
            "x": data.long,
            "y": data.lat
        },
        "attributes": {
            "Nazev_zarizeni": data.name,
            "More_info": data.url,
            "Adresa": data.adresa,
            "Sporty": data.typ,
            "image": "/img/fotbal.jpg",
            "Long": data.long,
            "Lat": data.lat,
        }
    };

    console.log(featureToUpdate)

    // Převedení na JSON řetězec
    const jsonStringData = JSON.stringify(featureToUpdate);

    // Nastavení hlaviček pro požadavek
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("features", [jsonStringData]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    // Asynchronní funkce pro odeslání dat
    const fetchDataAwait = async () => {
        try {
            const response = await fetch(url_add_records, requestOptions)

            if (response.ok) {
                console.log("Data byla úspěšně odeslána!");

                // Změna textu tlačítka po odeslání
                submitButton.innerText = "Odesláno"

                // Vyčištění formuláře
                form.reset();

            } else {
                console.log("Něco se nepovedlo!");
            }

        } catch (error) {
            console.log(error)
        }
    }

    fetchDataAwait()
}





