const request = require('request-promise');

const API_KEY = "4b8dc114b1f51a5d76e942900c4ce045";

class Weather {
  static retrieveByCity (city, callback) {
    request({
      uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`,
      json: true
    }).then(res => {
      callback(res);
    }).catch( err => {
      console.log({error: "Couid not reach OpenWeatherMap API."});
    });
  }
}

module.exports = Weather;
