const map = L.map('map').setView([49.824747684168656, 18.1805935547224], 13);


const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




///Ziskani dat
const queryURL = "https://services5.arcgis.com/UbiPR9eAyIWvC8EM/arcgis/rest/services/geoweb_data_sportoviste_bes0056/FeatureServer/0/query";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("f", "JSON");
urlencoded.append("where", "1 = 1");
urlencoded.append("outFields", "*");

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
};


// Vytvoreni specifikace ikony

var sport_icon = L.icon({
    iconUrl: '../img/atletika.jpg',
    iconSize: [40, 40], // size of the icon
    // iconAnchor: [40, 0]
});

// Vytvoreni leaflet featuregroup
var data_Sport_lyr = L.featureGroup()

fetchDataAwait(queryURL, requestOptions).then(async function (result) {


    await result.forEach(async element => {

        //console.log(element.attributes)

        const nazev = element.attributes.Nazev_zarizeni
        const adr = element.attributes.Adresa

        const long = element.attributes.Long
        const lat = element.attributes.Lat

        console.log(long, lat)

        //Definice popup
        var popup = L.popup()
            .setContent(`<div><h5>Sportovní zařízení</h5>
                        <table class="table">
                            <tbody>
                                <tr>
                                <th>Název zařízení:</th>
                                <td>${nazev}</td>
                                </tr>
                                <tr>
                                <th>Adresa zařízení:</th>
                                <td>${adr}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        </div>`)

        //Vytvoreni markeru
        var marker = L.marker([lat, long], { icon: sport_icon }).bindPopup(popup, { keepInView: true, autoPan: true, maxHeight: 300 })

        //Pridani markeru do Feature Group
        marker.addTo(data_Sport_lyr)

    });
    //Pridani Feature Group dat  do mapy
    data_Sport_lyr.addTo(map)

})


