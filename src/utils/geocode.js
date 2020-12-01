const request = require("request");

// mapbox (geocode) api
// to convert the address from 'city name' to 'lat and long'
const geocode = (address, callback) => {
  // encodeURIComponent() : => if user search with address that include special char like '?' the app will note crash
  //                        => so this fun will convert the address to encoded version ? => %3F
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaGFkaTAwOTYzIiwiYSI6ImNraHNncDRhczBkaG8ycnBpajBmMHptanoifQ.a3pYs2BjSVQCHgpvo1llAw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to mapbox service!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search.", undefined);
    } else {
      const { center, place_name } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
