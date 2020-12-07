const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// to run server write command: node src/app.js
const app = express();
// get port from host(heroku)
const port = process.env.PORT || 3000 // 3000 to run app locally

//************************************************************************************************************//
//console.log(__dirname);
//console.log(__filename);

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//************************************************************************************************************//

//************************************************************************************************************//
// Dynamic pages with Template (view engine)

// prepare express to read the path of views, since the file called 'templates' not 'views'
app.set("views", viewPath);

// setup handlebars engine
app.set("view engine", "hbs");

// Partials: is a part that will appear in all pages like 'navbar, footer'
hbs.registerPartials(partialsPath);

/** [setup static directory to serve]
 * when open localhost:3000 will see the content of index.html and other html pages
 * root (home) page will be shown first in url 'localhost:3000'
 * type 'about.html' in url and about page will appear
 */
app.use(express.static(publicDirectoryPath));
//************************************************************************************************************//

// render handlebars to browser
app.get("", (req, res) => {
  /**
   *  render view (hbs)
   * @viewNAme
   * @values to access from view(.hbs)
   */
  res.render("index", {
    title: "Weather",
    name: "Abdulhadi Bakr",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Abdulhadi Bakr",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Abdulhadi Bakr",
  });
});

app.get("/weather", (req, res) => {
  // force user to add search value
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location,
        forecast: forecastData,
      });
    });
  });
});

// setup nested page 404 Error
app.get("/help/*", (req, res) => {
  res.render("page404", {
    errorMessage: "Help article not found ):",
    title: "Page 404",
    name: "Abdulhadi Bakr",
  });
});

// setup page 404 Error
app.get("*", (req, res) => {
  res.render("page404", {
    errorMessage: "Page Not Found ):",
    title: "Page 404",
    name: "Abdulhadi Bakr",
  });
});

//************************************************************************************************************//
// port, callback function : fire when the server is up start running
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
