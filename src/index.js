function currentTime() {
  let now = new Date();
  let today = document.querySelector("p .today");
 
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();

  today.innerHTML = `${day}, ${month} ${date}, ${year}`;

  let time = document.querySelector("p .time");
  let sunrise = document.querySelector("#riseTime");
  let sunset = document.querySelector("#setTime");
  let hours = now.getHours();
  let minutes = now.getMinutes();

  time.innerHTML = `🕛 Last updated at ${hours}:${minutes}`;
  sunrise.innerHTML = `Sunrise: ${hours}:${minutes}am`;
  sunset.innerHTML = `Sunset: ${hours}:${minutes}pm`;


}
currentTime();

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
return `${hours}:${minutes}`;
}

function enterCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#searchedCity");
  let cityInput = document.querySelector("#search-text-input");
  currentCity.innerHTML = cityInput.value;

  citySearch(cityInput.value);
}

function showCurrentWeather(response) {
  console.log(response.data);

  let search = response.data.name;
  let searched = `${search}`;
  let searchedCity = document.querySelector("#searchedCity");
  searchedCity.innerHTML = searched;

  let nowSky = response.data.weather[0].description;
  let sky = `${nowSky}`;
  let mostly = document.querySelector("#mostly");
  mostly.innerHTML = sky;

  fahrenheitTemperature = response.data.main.temp;
  let nowTemperature = Math.round(fahrenheitTemperature);
  let fahrenheit = `${nowTemperature}`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = fahrenheit;
  
 let minTemp = Math.round(response.data.main.temp_min);
  let minimum = `Feels like: ${minTemp}°F`;
  let low = document.querySelector("#low");
  low.innerHTML = minimum;

  let feelTemp = Math.round(response.data.main.feels_like);
  let feelNow = `Tonight's low: ${feelTemp}°F`;
  let feels = document.querySelector("#feel");
  feels.innerHTML = feelNow;

  let currentHumidity = response.data.main.humidity;
  let humid = `Humidity: ${currentHumidity}%`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;

  let nowWind = Math.round(response.data.wind.speed);
  let windSpeed = `Wind: ${nowWind}mph`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;

  let barometricPressure = response.data.main.pressure;
  let currentPressure = `Pressure: ${barometricPressure}`;
  let barPressure = document.querySelector("#barPressure");
  barPressure.innerHTML = currentPressure;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);

  for (let index = 0; index < 6; index++) {
  let forecast = response.data.list[index];
 forecastElement.innerHTML += `
   <div class="col-2">
    ${formatHours(forecast.dt *1000)}
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    alt=${forecast.weather[0].description} class="hourly-icon"/>
    <div class="forecast-temp">
    ${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°
    </div>
    </div>`;
  }
}

function citySearch(city) {
  let apiKey = "738213e2d75e5700ee8029528ef19c1a";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(showCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(locationUrl).then(showCurrentWeather)
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let nowTemperature = document.querySelector("#temperature");
  nowTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let nowTemperature = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5 / 9);
  nowTemperature.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

citySearch("Binghamton")