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
  let hours = now.getHours();
  let minutes = now.getMinutes();

  time.innerHTML = `🕛 Last updated at ${hours}:${minutes}`;
}
currentTime();

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

  let nowSky = response.data.weather[0].description.toUpperCase();
  let sky = `${nowSky}`;
  let mostly = document.querySelector("#mostly");
  mostly.innerHTML = sky;

  let nowTemperature = Math.round(fahrenheitTemperature);
  let fahrenheit = `${nowTemperature}`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = fahrenheit;

  fahrenheitTemperature = response.data.main.temp;

  let minTemp = Math.round(response.data.main.temp_min);
  let minimum = `Feels like: ${minTemp}°F`;
  let low = document.querySelector("#low");
  low.innerHTML = minimum;

  let feelTemp = Math.round(response.data.main.feels_like);
  let feelNow = `Tonight's low: ${feelTemp}°F`;
  let feels = document.querySelector("#feel");
  feels.innerHTML = feelNow;

  let currentHumidity = response.data.main.humidity;
  let humid = `Humidity: ${feelTemp}%`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humid;

  let nowWind = Math.round(response.data.wind.speed);
  let windSpeed = `Wind: ${nowWind}mph`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;

  let sunriseTime = response.data.sys.sunrise;
  let currentSunrise = `Sunrise: ${sunriseTime}am`;
  let riseTime = document.querySelector("#riseTime");
  riseTime.innerHTML = currentSunrise;

  let sunsetTime = response.data.sys.sunset;
  let currentSunset = `Sunset: ${sunsetTime}pm`;
  let setTime = document.querySelector("#setTime");
  setTime.innerHTML = currentSunset;

  let barometricPressure = response.data.main.pressure;
  let currentPressure = `Pressure: ${barometricPressure}`;
  let barPressure = document.querySelector("#barPressure");
  barPressure.innerHTML = currentPressure;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForcast(response) {
  console.log(response.data);
}

function citySearch(city) {
  let apiKey = "738213e2d75e5700ee8029528ef19c1a";
  let units = "imperial";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(weatherUrl).then(showCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);
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

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

citySearch("Binghamton")