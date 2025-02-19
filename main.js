const apiKey = '1d224a4af2354cde18df2f7243cc84f4';
let curWeather = {};
let fiveDayForecast = [];

document.querySelector('.search').addEventListener('click', function () {
  const city = document.querySelector('#search-query').value;

  fetchCurWeather(city);
  fetchFiveDay(city);
  

  document.querySelector('#search-query').value = '';
});

const addCurWeather = (data) => {
//debugger;
    curWeather = {
      city: data.name || null,
      description: data.weather[0].main || null,
      icon: data.weather[0].icon || null,
      temp: Math.round(data.main.temp) || null,
    };

  renderCurWeather();

};

const addFiveDay = (data) => {
//debugger;
  for (i=7; i<data.list.length; i += 8){
    const curDay = {
      description: data.list[i].weather[0].main || null,
      icon: data.list[i].weather[0].icon || null,
      temp: Math.round(data.list[i].main.temp) || null,
      day: new Date(data.list[i].dt_txt).toLocaleString('en',{
        weekday: 'long'})
    };
    fiveDayForecast.push(curDay);
  }
  renderFiveDay();
};

const fetchCurWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addCurWeather(data));
}

const fetchFiveDay = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(url, {
    method: 'GET',
    dataType: 'json'
  })
    .then(data => data.json())
    .then(data => addFiveDay(data));
}

const renderCurWeather = () => {
  //debugger;
  document.querySelector('.current-weather').replaceChildren();

    const curWeatherTemplate = 
      `<div class = "col-md-4 d-flex justify-content-between align-items-center">
        <div class = "d-flex flex-column text-center justify-content-center">
            <h2>${curWeather.temp}\u00B0F</h2>
            <h3>${curWeather.city}</h3>
            <p>${curWeather.description}</p>
        </div>
        <div>
            <img src="https://openweathermap.org/img/wn/${curWeather.icon}@2x.png" alt="Weather Icon">
        </div>
      </div>`;

    document.querySelector('.current-weather').insertAdjacentHTML('beforeend', curWeatherTemplate);
};

