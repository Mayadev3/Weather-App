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
}

function searchCity(city) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ffe8ebc319a3f920065447a31ce0df0&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
searchCity("Berlin"); //This function is called with the city Berlin so that the minute a person opens the app, it automatically searches a city

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
}
function getPosition(position) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temp-number");
  celsiusTemp.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = "null";

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let forecastElement = document.querySelector("#forecast");

forecastHTML = `  <div class="row">`;
let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
days.forEach(function (day) {
  forecastHTML =
    forecastHTML +
    ` <div class="col">
                  <ul>
                    <li><span class="row-day">${day}</span></li>
                    <li><i class="fa-solid fa-sun"></i></li>
                    <li><span class="row-degree"><span class="temp-max">23°</span><span class="temp-min"> 18°</span></span></li>
                  </ul>
                </div>`;
});
forecastHTML = forecastHTML + `</div>`;

forecastElement.innerHTML = forecastHTML;
