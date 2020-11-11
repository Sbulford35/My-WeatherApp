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

let form = document.querySelector("#city-form");
form.addEventListener("submit", enterCity);

function showCurrentWeather(response) {
  console.log(response.data);

  let search = response.data.name.toUpperCase();
  let searched = `${search}`;
  let searchedCity = document.querySelector("#searchedCity");
  searchedCity.innerHTML = searched;

  let nowSky = response.data.weather[0].description.toUpperCase();
  let sky = `${nowSky}`;
  let mostly = document.querySelector("#mostly");
  mostly.innerHTML = sky;

  let nowTemperature = Math.round(response.data.main.temp);
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
}

function citySearch(city) {
  let apiKey = "738213e2d75e5700ee8029528ef19c1a";
  let units = "imperial";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(weatherUrl).then(showCurrentWeather);
}
