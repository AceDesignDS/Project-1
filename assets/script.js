var submitButton = document.getElementById("submit-button");


let map;
let geocoder;
let infowindow;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: 53.483959, lng: -2.244644 },
    });
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();   
}
function getPlaceData()
{
    // create a reference the search text
    // get the search text
    // pass the search text to the lookup location function
}
function lookupLocation(location)
{
    var requestOptions = {
        method: 'GET',            
        mode: 'no-cors'
    }
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyCr-Av0kS8QAYgzV2dOHJXomDn8rxTcsRA`)
        .then(response => response.json())
        .then(result => getPlaceId(result))
};
function getPlaceId(result)
{
    var placeId = result.predictions[0].place_id;
    geocodePlaceId(placeId);
}
function geocodePlaceId(placeId) {
    
    geocoder
        .geocode({ placeId: placeId })
        .then(({ results }) => {
        if (results[0]) {
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
            });
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
        } else {
            window.alert("No results found");
        }
        })
        .catch((e) => window.alert("Geocoder failed due to: " + e));
}

window.initMap = initMap;

function searchButtonClick() {
   var location = document.getElementById('search-text').value
   
   if (location === "") {
       alert("Must enter a location")
   } else {
    lookupLocation(location)
   }
}

submitButton.addEventListener("click", searchButtonClick);

function displayOptions(data)
    {
        //document.getElementById("City").innerHTML = data.city_name;
        //document.getElementById("Country").innerHTML = data.country_name;
        console.log(data)
        var city = data.city_name
        var priceOptions = document.getElementById("myDropdown");
        var heading = document.createElement("h2");
        heading.innerText = `prices in ${city}`;
        priceOptions.appendChild(heading)
        for (var i = 0; i < data.prices.length; i+=3)
        {
            // variables for API data
            var price = data.prices[i];
            console.log(price)
            var item = price.item_name
            var category = price.category_name
            var min = price.min
            var max = price.max

            //variable for DOM elements
            var card = document.createElement("div");
            var itemHeading = document.createElement("h3");
            var categoryText = document.createElement("p");
            var priceRangeText = document.createElement("p");

            //inject data into DOM element variables
            itemHeading.innerText = item
            categoryText.innerText = category
            if (category === "Buy Apartment") {
                priceRangeText.innerText = `£${min}-£${max} per square foot`  
            }
            else if (category === "Childcare") {
                priceRangeText.innerText = `£${min}-£${max} per month`
            }
            else {
                priceRangeText.innerText = `£${min}-£${max}`
            }
            


            // inject DOM element variables into card variable
            card.appendChild(itemHeading)
            card.appendChild(categoryText)
            card.appendChild(priceRangeText)

            // inject card into DOM
            priceOptions.appendChild(card)
            // var newOtion = document.createElement("a");
            // newOtion.title = price.item_name;
            // var linkText = document.createTextNode("my title text");
            // newOtion.appendChild(linkText);
            // newOtion.title = "my title text";
            // //document.body.appendChild(newOtion);
            // //priceOptions.add(newOtion);
            // newOtion.setAttribute("data-id", [0]);
        }
    }
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
            'X-RapidAPI-Key': 'dec21d23f8msh9077dd87b20b9a6p13561fjsn6a71561e267a'
        }
    };
    fetch('https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=London&country_name=United%20Kingdom', options)
        .then(response => response.json())
        .then(response => displayOptions(response))
        .catch(err => console.error(err));

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }