console.log("Javascript from client side");

const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const locationParagraph = document.querySelector("#location");
const forecastParagraph = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = weatherInput.value;
  if (address) {
    locationParagraph.textContent = "Loading...";
    forecastParagraph.textContent = "";
    fetch(`/weather/?address=${address}`).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            locationParagraph.textContent = data.error;
          } else {
            locationParagraph.textContent = data.location;
            forecastParagraph.textContent = data.forecast;
          }
        });
      }
    );
  }
});
