const apiKey = 'ba9f674533f5d25ab3dea43c3c523f8c'; // Replace with your actual API key
const cityInput = document.getElementById('city');
const searchButton = document.getElementById('search');
const weatherDiv = document.getElementById('weather');
const forecastDiv = document.getElementById('forecast');
const errorDiv = document.getElementById('error');

searchButton.addEventListener('click', getWeather);

function getWeather() {
    const city = cityInput.value.trim();
    if (city === '') return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => displayError('Error fetching weather data'));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => displayError('Error fetching forecast data'));
}

function displayWeather(data) {
    const weather = data.weather[0];
    const main = data.main;

    const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Weather: ${weather.description}</p>
    `;

    weatherDiv.innerHTML = html;
}

function displayForecast(data) {
    const forecastHtml = data.list.slice(0, 5).map((forecast, index) => {
        return `
            <p>${new Date(forecast.dt * 1000).toLocaleTimeString()}: ${forecast.main.temp}°C, ${forecast.weather[0].description}</p>
        `;
    }).join('');

    forecastDiv.innerHTML = `
        <h2>5-Hour Forecast</h2>
        ${forecastHtml}
    `;
}

function displayError(message) {
    errorDiv.innerHTML = message;
}