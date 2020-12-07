const request = require("request");

// weather api, get weather status by passing lat&lon of any city
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=98eb20e3bb62bd1a9812c6b8384f0d6f&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      const {
        observation_time,
        weather_descriptions,
        temperature,
        feelslike,
      } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]} - It's currently ${temperature} degrees out, It feels like ${feelslike} degrees out. Time is: ${observation_time}`
      );
    }
  });
};

module.exports = forecast;
