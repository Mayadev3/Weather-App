function formatDate(timestamp) {
  //This function will calculate the time from 1970 to today
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function getForecast(coordinates) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let cityElement2 = (document.querySelector("#city-submitted").innerHTML =
    response.data.name);

  let tempElement = (document.querySelector("#temp-number").innerHTML =
    Math.round(response.data.main.temp));

  let windElement = (document.querySelector("#wind").innerHTML =
    response.data.wind.speed);

  let humidityElement = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;

  let dateElement = document.querySelector("#day-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
  /*I created this  new function called getForecast here to use the response info latitude and longitude in my apiURL for my forecast*/
}

function searchCity(city) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ffe8ebc319a3f920065447a31ce0df0&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  searchCity(city);
}

function showCityWeather(response) {
  let citySubmitted = document.querySelector("#city-submitted");
  citySubmitted.innerHTML = `${response.data.name}`;

  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let cityWind = document.querySelector("#wind");
  cityWind.innerHTML = `${response.data.wind.speed}`;

  let cityHumidity = document.querySelector("#humidity");
  cityHumidity.innerHTML = `${response.data.main.humidity}`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  searchCity(response.data.name);
}
function getPosition(position) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp-number");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //the codes about classList  are used for the shift between celsius and fahrenheit
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temp-number");
  celsiusTemp.innerHTML = celsiusTemperature;
  //the codes about classList  are used for the shift between celsius and fahrenheit
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusTemperature = "null";

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

function formatDay(timestamp) {
  //This function is for concactinating the days in the displayForecast function
  let now = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  forecastHTML = `<div class="row">`;
  console.log(response.data.daily);
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    //the forecastDay parameter is equals to forecast variable
    if (index < 5)
      //we created the index to tell how many times the html should be repeated
      forecastHTML =
        forecastHTML +
        `<div class="col">
      
                <ul>
                  <li><span class="row-day">${formatDay(
                    forecastDay.dt
                  )}</span></li>
                  <li><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" class="icon2"/></li>
                  <li>
                    <span class="row-degree">
                      <span class="temp-max" id="temp-max" id="temp-max">${Math.round(
                        forecastDay.temp.max
                      )}°</span>
                      <span class="temp-min" id="temp-min" id="temp-min">${Math.round(
                        forecastDay.temp.min
                      )}°</span>
                    </span>
                  </li>
                </ul>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

searchCity("Berlin"); //This function is called with the city Berlin so that the minute a person opens the app, it automatically searches a city
