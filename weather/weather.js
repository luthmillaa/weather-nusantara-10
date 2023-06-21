function getParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const locationParam = urlParams.get('location');
  const futureParam = urlParams.get('future');
  console.log(`params: ${locationParam} & ${futureParam}`);

  if (!locationParam && !futureParam) {
    // hanya fitur current weather menggunakan current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(callBackLocation);
    }

  } else if (locationParam && !futureParam) {
    // hanya fitur current weather menggunakan param location
    currentWeather(locationParam);
    forecastWeather(locationParam);

  } else if (locationParam && futureParam) {
    // fitur current & future weather menggunakan param location
    currentWeather(locationParam);
    forecastWeather(locationParam);
    futureWeather(locationParam, futureParam); // date must be in yyyy-MM-dd format

    $('#forecast-empty').hide();
    $('#future-empty').hide();
    $('#frame-column').css('display', 'flex');
    $('#frame-weather2').css('display', 'flex');
  }
}

function getDayName(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(date).getDay()];
}

function callBackLocation(position) {
  currentWeather(`${position.coords.latitude},${position.coords.longitude}`);
}

function currentWeather(location) {
  console.log(`current weather: ${location}`)
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  // TODO
  fetch(urlCurrent)
    .then(response => response.json())
    .then(data => {
      if (data) {
        // get data
        const localDateTime = data.location.localtime;
        const localDayDateTime = `${getDayName(localDateTime.split(' ')[0])}, ${localDateTime}`; // 1
        const cityCountryName = `${data.location.name}, ${data.location.country}` // 2
        const tempC = `${data.current.temp_c}°C`; // 3
        const tempF = `/ ${data.current.temp_f}°F`; // 4
        const condition = `${data.current.condition.text}`; // 5
        const windSpeed = `${data.current.wind_mph} mph / ${data.current.wind_kph} kph`; // 6
        const windDir = `${data.current.wind_dir}`; // 7
        const humidity = `${data.current.humidity} %`; // 8
        const cloudCover = `${data.current.cloud} %`; // 9
        const visibility = `${data.current.vis_miles} miles / ${data.current.vis_km} km`; // 10
        const uvIndex = `${data.current.uv} %`; // 11
        const aqData = data.current.air_quality;
        const usEpaIndex = `Air Quality: ${aqData["us-epa-index"]} `; // 12
        const co = `${aqData.co} µg/m3`; // 13
        const no2 = `${aqData.no2} µg/m3`; // 14
        const o3 = `${aqData.o3} µg/m3`; // 15
        const so2 = `${aqData.so2} µg/m3`; // 16
        const pm10 = `${aqData.pm10} µg/m3`; // 17
        const conditionImg = `${data.current.condition.icon}` // 18

        // use DOM manipulation
        const container = document.querySelector('.main-frame-weather')
        const elLocalDayDateTime = container.querySelector('.day');
        elLocalDayDateTime.textContent = localDayDateTime;
        const elCityCountryName = container.querySelector('.city-name-country');
        elCityCountryName.textContent = cityCountryName;
        const elTempC = container.querySelector('.c');
        elTempC.textContent = tempC;
        const elTempF = container.querySelector('.f');
        elTempF.textContent = tempF;
        const elCondition = container.querySelector('.condition');
        elCondition.textContent = condition;
        const elWindSpeed = container.querySelector('#wind-speed');
        elWindSpeed.textContent = windSpeed;
        const elWindDir = container.querySelector('#wind-dir');
        elWindDir.textContent = windDir;
        const elHumidity = container.querySelector('#humidity');
        elHumidity.textContent = humidity;
        const elCloud = container.querySelector('#cloud');
        elCloud.textContent = cloudCover;
        const elVis = container.querySelector('#vis');
        elVis.textContent = visibility;
        const elUv = container.querySelector('#uv');
        elUv.textContent = uvIndex;
        const elUsEpa = container.querySelector('#us-epa-index');
        elUsEpa.textContent = usEpaIndex;
        const elCo = container.querySelector('#co');
        elCo.textContent = co;
        const elNo2 = container.querySelector('#no2');
        elNo2.textContent = no2;
        const elO3 = container.querySelector('#o3');
        elO3.textContent = o3;
        const elSo2 = container.querySelector('#so2');
        elSo2.textContent = so2;
        const elPm10 = container.querySelector('#pm10');
        elPm10.textContent = pm10;
        const elConditionImg = container.querySelector('#condition-img');
        elConditionImg.src = conditionImg;
      }
    })
    .then(() => {
      $('#forecast-empty').hide();
      $('#frame-column').css('display', 'flex');
    })
    .catch(error => {
      console.log('Error fetching current weather:', error);
    });
}

function forecastWeather(location) {
  console.log(`forecast weather: ${location}`)
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=yes&alerts=no`;
  // TODO
}

function futureWeather(location, date) {
  console.log(`future weather: ${location} in ${date}`);
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlFuture = `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${location}&dt=${date}`;
  // TODO
}

getParams();