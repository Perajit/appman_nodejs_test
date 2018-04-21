require('isomorphic-fetch');

const { readFileSync } = require('fs');
const API_ROOT = 'http://api.openweathermap.org/data/2.5/forecast/daily';
const bkkId = 1609350;

const apiFilePath = __dirname + '/openweather.key.txt';
const apiKey = readFileSync(apiFilePath, 'utf8');

const request = (url, requestOptions) => {
  return fetch(url, requestOptions)
    .then((res) => res.json())
}

const bangkokForecast = () => {
  return request(`${API_ROOT}?APPID=${apiKey}&units=metric&cnt=7&id=${bkkId}`)
    .then((json) => {
      let { list } = json;

      return list.map((item) => {
        let {
          dt,
          temp: { min, max }
        } = item;
        let date = new Date(dt);

        return {
          date: date.toISOString().substr(0, 10),
          minTemp: min,
          maxTemp: max
        }
      });
    });
};

module.exports = { bangkokForecast };
