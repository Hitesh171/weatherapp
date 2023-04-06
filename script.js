document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const cityInput = document.querySelector('#city');
  const searchButton = document.querySelector('#search');
  const weatherInfo = document.querySelector('#weather-info');
  const API_KEY = 'e076cfbf082548b696271048230404';

  searchButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const icon = data.current.condition.icon;
        const humidity = data.current.humidity;
        const precip = data.current.precip_mm;
        const isDay = data.current.is_day === 1;

        const weatherItem = document.createElement('div');
        weatherItem.classList.add('weather-item');

        const weatherImage = document.createElement('img');
        weatherImage.src = `https:${icon}`;
        weatherImage.alt = description;

        const weatherTemperature = document.createElement('p');
        weatherTemperature.innerHTML = `${temperature} &deg;C`;

        const weatherDescription = document.createElement('p');
        weatherDescription.innerHTML = description;

        const precipitation = document.createElement('p');
        precipitation.innerHTML = `Precipitation: ${precip} mm`;

        const humidityInfo = document.createElement('p');
        humidityInfo.innerHTML = `Humidity: ${humidity}%`;

        const dayNightInfo = document.createElement('p');
        dayNightInfo.innerHTML = `Day/Night: ${isDay ? 'Day' : 'Night'}`;

        weatherItem.appendChild(weatherImage);
        weatherItem.appendChild(weatherTemperature);
        weatherItem.appendChild(weatherDescription);
        weatherItem.appendChild(precipitation);
        weatherItem.appendChild(humidityInfo);
        weatherItem.appendChild(dayNightInfo);

        weatherInfo.innerHTML = '';
        weatherInfo.appendChild(weatherItem);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = 'Sorry, an error occurred while fetching weather data. Please try again later.';
      });
  });
});
