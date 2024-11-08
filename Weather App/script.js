const apiKey = "2ca76f36b9b1da11499e23bc4cfadb89"; // OpenWeatherMap API key
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // API endpoint

const searchBox = document.querySelector(".search input"); // Input field for city name
const searchBtn = document.querySelector(".search button"); // Search button
const weatherIcon = document.querySelector(".weather-icon"); // Weather icon image element

// Function to check the weather for a given city
async function checkWeather(city) {
    const weatherDiv = document.querySelector(".weather"); // Select the weather display element
    const errorDiv = document.querySelector(".error"); // Select the error message element

    // Start by fading out the weather and error messages
    weatherDiv.classList.add('fade-out');
    errorDiv.classList.add('fade-out');

    // Wait for the fade-out animation to complete
    setTimeout(async () => {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`); // Fetch weather data

        if (response.status == 404) {
            // Hide the weather details first
            weatherDiv.classList.add('fade-out'); // Fade out the weather
            setTimeout(() => {
                weatherDiv.style.display = "none"; // Hide weather details after fade-out
                // Now show the error message
                errorDiv.style.display = "block"; // Show error message
                errorDiv.classList.remove('fade-out'); // Remove fade-out
                errorDiv.classList.add('fade-in'); // Add fade-in animation
            }, 200); // Delay for fade-out to complete
        } else {
            const data = await response.json(); // Parse the JSON response

            // Update the HTML elements with the weather data
            document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`; // Display city and country
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Temperature
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Humidity
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Wind speed

            // Add the weather condition name
            const weatherCondition = data.weather[0].main; // Get the main weather condition
            document.querySelector(".weather-condition").innerHTML = weatherCondition; // Display it

            // Change the weather icon based on the weather condition
            if (weatherCondition == "Clouds") {
                weatherIcon.src = "img/clouds.png";
            } else if (weatherCondition == "Clear") {
                weatherIcon.src = "img/clear.png";
            } else if (weatherCondition == "Rain") {
                weatherIcon.src = "img/rain.png";
            } else if (weatherCondition == "Drizzle") {
                weatherIcon.src = "img/drizzle.png";
            } else if (weatherCondition == "Mist") {
                weatherIcon.src = "img/mist.png";
            } else if (weatherCondition == "Snow") {
                weatherIcon.src = "img/snow.png";
            } else if (weatherCondition == "Thunderstorm") {
                weatherIcon.src = "img/thunderstorm.png";
            } else if (data.weather[0].description == "Few clouds") {
                weatherIcon.src = "img/fewclouds.png";
            } else if (data.weather[0].description == "Rainstorm") {
                weatherIcon.src = "img/rainstorm.png";
            } else if (weatherCondition == "Drizzle rain") {
                weatherIcon.src = "img/drizzlerain.png";
            } else if (weatherCondition == "Fog") {
                weatherIcon.src = "img/fog.png";
            } else if (data.weather[0].description == "Heavy drizzle") {
                weatherIcon.src = "img/heavydrizzle.png";
            } else if (data.weather[0].description == "Heavy rain") {
                weatherIcon.src = "img/heavyrain.png";
            } else if (weatherCondition == "Heavy snow") {
                weatherIcon.src = "img/heavysnow.png";
            } else if (weatherCondition == "Light rain") {
                weatherIcon.src = "img/lightrain.png";
            } else if (data.weather[0].description == "Overcast clouds") {
                weatherIcon.src = "img/overcastclouds.png";
            } else if (data.weather[0].description == "Sand") {
                weatherIcon.src = "img/sand.png";
            } else if (data.weather[0].description == "Tornado") {
                weatherIcon.src = "img/tornado.png";
            }

            // Show weather details
            weatherDiv.classList.remove('fade-out'); // Remove the fade-out animation
            weatherDiv.classList.add('fade-in'); // Add the fade-in animation
            weatherDiv.style.display = "block"; // Show the weather details

            // Hide the error message
            errorDiv.classList.add('fade-out'); // Add the fade-out animation
            errorDiv.classList.remove('fade-in'); // Remove the fade-in animation

            setTimeout(() => {
                errorDiv.style.display = "none"; // Hide error message after animation
            }, 300); // Match with animation duration

            // Show the card smoothly
            setTimeout(() => {
                card.classList.remove('hidden'); // Show the card
                card.classList.add('visible'); // Ensure visible class for animation
            }, 100); // Delay to allow error message fade-out
        }
    }, 300); // Delay to allow fade-out animation to finish
}

// Function to handle the weather search
function searchWeather() {
    const city = searchBox.value.trim(); // Trim whitespace from the input
    if (city) {
        checkWeather(city); // Call the function only if a city name is provided
        searchBox.value = ""; // Clear the input field after the search
    } else {
        alert("Please enter a city name"); // Alert if no input is provided
    }
}

// Add event listener to the search button
searchBtn.addEventListener("click", searchWeather);

// Add event listener for pressing the Enter key in the input field
searchBox.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') { // Check if Enter key was pressed
        searchWeather(); // Trigger the search when Enter is pressed
    }
});

// Reset input value on page load
window.onload = function() {
    searchBox.value = ""; // Clear the input field when the page is loaded
};
