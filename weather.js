// weather.js

document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.querySelector(".city-input");
    const searchBtn = document.querySelector(".search-btn");
    const locationBtn = document.querySelector(".location-btn");

    const API_key = "b634d092f8c4eb1c87bbdf56deb368d7"; 

    // Function to fetch weather data for a given city
    const getWeatherData = (city) => {
        const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

        fetch(weatherApi)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => {
                displayWeather(data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    const displayWeather = (data) => {
        const cityName = data.name;
        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        document.querySelector(".city-name").textContent = cityName;
        document.querySelector(".temperature").textContent = `${temperature}°C`;
        document.querySelector(".wind-speed").textContent = `${windSpeed} m/s`;
        document.querySelector(".humidity").textContent = `${humidity}%`;
    };
    searchBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const cityName = cityInput.value.trim();
        if (cityName !== "") {
            getWeatherData(cityName);
        } else {
            alert("Please enter a city name");
        }
    });
    locationBtn.addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                fetch(
                    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const cityName = data.name;
                        getWeatherData(cityName);
                    })
                    .catch((error) => {
                        alert("Error while getting location");
                    });
            });
        } else {
            alert("Geolocation is not supported by your browser");
        }
    });
});
