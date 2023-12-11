/* weather.js */
document.addEventListener

class WeatherWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:`open`});
    this.shadowRoot.innerHTML = `<style> 
      :host {
        display: inline-block;
        background-color: lightgreen;
        padding: 10px;
        border-radius: 10px;
      }
      p {
        font-weight: bold;
        color: yellow;
        margin-left: 7em;
      }
      #weatherImg {
        float: left;
        border-radius: 1em;
      }
    </style>
    <img id="weatherImg" alt="Weather Icon">
    <p id="genInfo"></p>
    <p id="moreInfo"></p>`;
    this.fetchWeather();
  }
  fetchWeather() {
    const weatherElement = this.shadowRoot.getElementById("genInfo");
    fetch("https://api.weather.gov/gridpoints/SGX/55,22/forecast")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: Unable to fetch weather data. Status code: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const mostRecentWeather = data.properties.periods[0];
      this.displayWeather(`${mostRecentWeather.shortForecast} ${mostRecentWeather.temperature} °${mostRecentWeather.temperatureUnit}`, 
      `${mostRecentWeather.icon}`, `${mostRecentWeather.windSpeed}, ${mostRecentWeather.windDirection}`);
      
    })
    .catch(error => {
      console.error(error.message);
    });
  }
  displayWeather(genContent, img, moreContent) {
    const weatherElement = this.shadowRoot.getElementById("genInfo");
    const weatherImg = this.shadowRoot.getElementById("weatherImg");
    const detailedContent = this.shadowRoot.getElementById("moreInfo");
    weatherElement.textContent = genContent;
    weatherImg.src = img;
    detailedContent.textContent = moreContent;

  }
}

customElements.define("weather-widget", WeatherWidget);

