function showTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let htmlDay = document.querySelector("#now-day");
  htmlDay.innerHTML = `${currentDay} `;

  let currentTime = document.querySelector("#now-time");
  currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
}
showTime();

function changeDegreeFahrenheit(event) {
  event.preventDefault();

  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = `66`;
}

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", changeDegreeFahrenheit);

function changeDegreeCelsius(event) {
  event.preventDefault();

  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = `18`;
}

let celsiusLink = document.querySelector("#temp-celsius");
celsiusLink.addEventListener("click", changeDegreeCelsius);

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
  console.log(descriptionElement);
}

function searchCity(city) {
  let apiKey = "8ffe8ebc319a3f920065447a31ce0df0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}
//This function below was created so that the minute a person opens the app, it automatically searches a city
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  searchCity(city);
}

function showCityWeather(response) {
  let citySubmitted = document.querySelector("#city-submitted");
  citySubmitted.innerHTML = `${response.data.name}`;

  let cityTemp = document.querySelector("#temp-number");
  cityTemp.innerHTML = `${response.data.main.temp}`;

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
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentLocation);
