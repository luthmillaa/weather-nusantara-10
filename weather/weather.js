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
    marineWeather(locationParam);
    forecastWeather(locationParam);

  } else if (locationParam && futureParam) {
    // fitur current & future weather menggunakan param location
    currentWeather(locationParam);
    marineWeather(locationParam);
    forecastWeather(locationParam);
    futureWeather(locationParam, futureParam); // date must be in yyyy-MM-dd format
  }
}

function getDayName(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(date).getDay()];
}

function callBackLocation(position) {
  const latLong = `${position.coords.latitude},${position.coords.longitude}`
  currentWeather(latLong);
  marineWeather(latLong);
  forecastWeather(latLong);
}

function currentWeather(location) {
  console.log(`current weather: ${location}`);
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

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
    .catch(error => {
      console.log('Error fetching current weather:', error);
    });
}

function marineWeather(location) {
  console.log(`marine weather: ${location}`);
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlMarine = `http://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${location}`;

  fetch(urlMarine)
    .then(response => response.json())
    .then(data => {
      if (data) {
        const mrnData = data.forecast.forecastday[0].day;
        const container = document.querySelector('.frame-marine');

        const elTempC = container.querySelector('#mrn-c');
        elTempC.textContent = `${mrnData.avgtemp_c}°C`;
        const elTempF = container.querySelector('#mrn-f');
        elTempF.textContent = `/ ${mrnData.avgtemp_f}°F`;
        const elCondition = container.querySelector('#mrn-condition');
        elCondition.textContent = `${mrnData.condition.text}`;
        const elWindSpeed = container.querySelector('#mrn-wind-speed');
        elWindSpeed.textContent = `${mrnData.maxwind_mph} mph / ${mrnData.maxwind_kph} kph`;
        const elHumidity = container.querySelector('#mrn-humidity');
        elHumidity.textContent = `${mrnData.avghumidity} %`;
        const elVis = container.querySelector('#mrn-vis');
        elVis.textContent = `${mrnData.avgvis_miles} miles / ${mrnData.avgvis_km} km`;
      }
    })
    .catch(error => {
      console.log('Error fetching marine weather:', error);
    });
}

function forecastWeather(location) {
  console.log(`forecast weather: ${location}`);
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=yes&alerts=no`;
  
  fetch(urlForecast)
    .then(response => response.json())
    .then(data => {
      if (data) {
        const forecastDays = data.forecast.forecastday; // 3 days forecast data
        forecastDays.splice(0, 1);
        const container = document.querySelector('.day-date2');
        const dayContainers = container.querySelectorAll('.day-date-local'); // 3 days forecast container

        forecastDays.forEach((value, index) => {
          const currContainer = dayContainers[index];
          const elDayDate = currContainer.querySelector('#fc-day');
          elDayDate.textContent = `${getDayName(value.date)}, ${value.date}`;

          const day = value.day;
          const elTempC = currContainer.querySelector('#fc-c');
          elTempC.textContent = `${day.avgtemp_c}°C`;
          const elTempF = currContainer.querySelector('#fc-f');
          elTempF.textContent = `/ ${day.avgtemp_f}°F`;
          const elCondition = currContainer.querySelector('#fc-condition');
          elCondition.textContent = `${day.condition.text}`;

          const hours = value.hour;
          const elTemp6am = currContainer.querySelector('#fc-temp-6am');
          elTemp6am.textContent = `${hours[6].temp_c}°C / ${hours[6].temp_f}°F`;
          const elCond6am = currContainer.querySelector('#fc-cond-6am');
          elCond6am.textContent = `${hours[6].condition.text}`;
          const elTemp9am = currContainer.querySelector('#fc-temp-9am');
          elTemp9am.textContent = `${hours[9].temp_c}°C / ${hours[9].temp_f}°F`;
          const elCond9am = currContainer.querySelector('#fc-cond-9am');
          elCond9am.textContent = `${hours[9].condition.text}`;
          const elTemp12pm = currContainer.querySelector('#fc-temp-12pm');
          elTemp12pm.textContent = `${hours[12].temp_c}°C / ${hours[12].temp_f}°F`;
          const elCond12pm = currContainer.querySelector('#fc-cond-12pm');
          elCond12pm.textContent = `${hours[12].condition.text}`;
          const elTemp3pm = currContainer.querySelector('#fc-temp-3pm');
          elTemp3pm.textContent = `${hours[15].temp_c}°C / ${hours[15].temp_f}°F`;
          const elCond3pm = currContainer.querySelector('#fc-cond-3pm');
          elCond3pm.textContent = `${hours[15].condition.text}`;
          const elTemp6pm = currContainer.querySelector('#fc-temp-6pm');
          elTemp6pm.textContent = `${hours[18].temp_c}°C / ${hours[18].temp_f}°F`;
          const elCond6pm = currContainer.querySelector('#fc-cond-6pm');
          elCond6pm.textContent = `${hours[18].condition.text}`;
          const elTemp9pm = currContainer.querySelector('#fc-temp-9pm');
          elTemp9pm.textContent = `${hours[21].temp_c}°C / ${hours[21].temp_f}°F`;
          const elCond9pm = currContainer.querySelector('#fc-cond-9pm');
          elCond9pm.textContent = `${hours[21].condition.text}`;
        });
      }
    })
    .then(() => {
      $('#forecast-empty').hide();
      $('#frame-column').css('display', 'flex');
    })
    .catch(error => {
      console.log('Error fetching forecast weather:', error);
    });
}

function futureWeather(location, date) {
  console.log(`future weather: ${location} in ${date}`);
  const apiKey = '61082700d6284853a6e92559231506'; // Ganti dengan kunci API cuaca yang valid
  const urlFuture = `http://api.weatherapi.com/v1/future.json?key=${apiKey}&q=${location}&dt=${date}`;

  // TODO
  fetch(urlFuture)
    .then(response => response.json())
    .then(data => {
      if (data) {
        const container = document.querySelector('#frame-weather2');
        const elCityCountry = container.querySelector('#ftr-city-country');
        elCityCountry.textContent = `${data.location.name}, ${data.location.country}`

        const ftrData = data.forecast.forecastday[0];
        const elDay = container.querySelector('#ftr-day');
        elDay.textContent = `${getDayName(ftrData.date)}, ${ftrData.date}`;

        const ftrDayData = ftrData.day;
        const elTempC = container.querySelector('#ftr-c');
        elTempC.textContent = `${ftrDayData.avgtemp_c}°C`;
        const elTempF = container.querySelector('#ftr-f');
        elTempF.textContent = `/ ${ftrDayData.avgtemp_f}°F`;
        const elCond = container.querySelector('#ftr-cond');
        elCond.textContent = `${ftrDayData.condition.text}`;
        const elCondImg = container.querySelector('#ftr-cond-img');
        elCondImg.src = `${ftrDayData.condition.icon}`;
        const elWindSpeed = container.querySelector('#ftr-wind-speed');
        elWindSpeed.textContent = `${ftrDayData.maxwind_mph} mph / ${ftrDayData.maxwind_kph} kph`;
        const elHumidity = container.querySelector('#ftr-humid');
        elHumidity.textContent = `${ftrDayData.avghumidity} %`;
        const elVis = container.querySelector('#ftr-vis');
        elVis.textContent = `${ftrDayData.avgvis_miles} miles / ${ftrDayData.avgvis_km} km`;
        const elUv = container.querySelector('#ftr-uv');
        elUv.textContent = `${ftrDayData.uv}`;
      }
    })
    .then(() => {
      $('#future-empty').hide();
      $('#frame-weather2').css('display', 'flex');
    })
    .catch(error => {
      console.log('Error fetching forecast weather:', error);
    })
}

getParams();