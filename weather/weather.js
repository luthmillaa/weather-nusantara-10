function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const locationParam = urlParams.get('location');
  const futureParam = urlParams.get('future');
  console.log(`${locationParam} & ${futureParam}`);

  if (!locationParam && !futureParam) {
    // hanya fitur current weather menggunakan current location
    // TODO - detect user's current location
    const currLocation = 'dummy';
    currentWeather(currLocation);
    $('#forecast-empty').hide();
    $('#frame-column').css('display', 'flex');

  } else if (locationParam && !futureParam) {
    // hanya fitur current weather menggunakan param location
    currentWeather(locationParam);
    forecastWeather(locationParam);
    
    $('#forecast-empty').hide();
    $('#frame-column').css('display', 'flex');

  } else if (locationParam && futureParam) {
    // fitur current & future weather menggunakan param location
    currentWeather(locationParam);
    forecastWeather(locationParam);
    futureWeather(locationParam, futureParam);

    $('#forecast-empty').hide();
    $('#future-empty').hide();
    $('#frame-column').css('display', 'flex');
    $('#frame-weather2').css('display', 'flex');
  }
}

function currentWeather(location) {
  console.log(`current weather: ${location}`)
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  // TODO
}

function forecastWeather(location) {
  console.log(`forecast weather: ${location}`)
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=no`;
  // TODO
}

function futureWeather(location, date) {
  console.log(`future weather: ${location} in ${date}`);
  // TODO
}

getParams();