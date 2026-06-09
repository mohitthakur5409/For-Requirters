const apiKey = "4005185bc871085cd06ed28a9ec6ab27"; // Replace with your OpenWeatherMap API key

// Default location: Una, Himachal Pradesh
window.onload = () => {
    getWeather("Una,IN");
};

// Search weather
function searchWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Enter a city name");
        return;
    }

    getWeather(city);
}

// Fetch weather and forecast
async function getWeather(city) {

    try {

        // Current weather
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const weatherData = await weatherResponse.json();

        if (weatherData.cod != 200) {
            alert("City not found!");
            return;
        }

        // Update current weather

        document.getElementById("name").innerHTML =
            weatherData.name + ", " + weatherData.sys.country;

        document.getElementById("temp").innerHTML =
            Math.round(weatherData.main.temp) + "°C";

        document.getElementById("condition").innerHTML =
            weatherData.weather[0].main;

        document.getElementById("humidity").innerHTML =
            "💧 Humidity: " + weatherData.main.humidity + "%";

        document.getElementById("wind").innerHTML =
            "🌬 Wind: " + weatherData.wind.speed + " m/s";

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        changeBackground(weatherData.weather[0].main);

        // 5-Day Forecast

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const forecastData = await forecastResponse.json();

        let forecastHTML = "";

        for (let i = 0; i < forecastData.list.length; i += 8) {

            const item = forecastData.list[i];

            const date = new Date(item.dt_txt);

            forecastHTML += `
            <div class="card">
                <h4>${date.toDateString().slice(0, 10)}</h4>

                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">

                <p>${Math.round(item.main.temp)}°C</p>

                <p>${item.weather[0].main}</p>
            </div>
            `;
        }

        document.getElementById("forecast").innerHTML =
            forecastHTML;

    }

    catch (error) {
        console.log(error);
        alert("Unable to fetch weather data.");
    }
}

// Current location weather

function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            showPosition,
            () => {
                alert("Location access denied.");
            }
        );

    } else {
        alert("Geolocation not supported.");
    }
}

async function showPosition(position) {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        getWeather(data.name);

    }

    catch {
        alert("Could not fetch location weather.");
    }
}

// Dynamic background

function changeBackground(weather) {

    switch (weather) {

        case "Clear":
            document.body.style.background =
                "linear-gradient(to right,#56CCF2,#2F80ED)";
            break;

        case "Clouds":
            document.body.style.background =
                "linear-gradient(to right,#757F9A,#D7DDE8)";
            break;

        case "Rain":
        case "Drizzle":
            document.body.style.background =
                "linear-gradient(to right,#4B79A1,#283E51)";
            break;

        case "Thunderstorm":
            document.body.style.background =
                "linear-gradient(to right,#232526,#414345)";
            break;

        case "Snow":
            document.body.style.background =
                "linear-gradient(to right,#E6DADA,#274046)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            document.body.style.background =
                "linear-gradient(to right,#BDC3C7,#2C3E50)";
            break;

        default:
            document.body.style.background =
                "linear-gradient(to right,#2193b0,#6dd5ed)";
    }
}