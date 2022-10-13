const fullProgress = 0.75;

moment.locale("RU");
let today = moment().format("E");

const autoCompleteJS = new autoComplete({
  placeHolder: "Введите название города...",
    data: {
        src: cities,
        keys: ['name'],
        filter: (list) => {
          const results = list.filter((item) => {
              const inputValue = autoCompleteJS.input.value.toLowerCase();
              const itemValue = item.value.name.toLowerCase();

              if (itemValue.startsWith(inputValue)) {
                return item.value.name;
              }
          });
      
          return results;
      },
    },
    resultItem: {
        highlight: true,
    },
    submit: true,
    searchEngine: "strict",
    resultsList: {
      element: (list, data) => {
          if (!data.results.length) {
              // Create "No Results" message list element
              const message = document.createElement("div");
              message.setAttribute("class", "no_result");
              // Add message text content
              message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
              // Add message list element to the list
              list.appendChild(message);
          }
      },
      noResults: true,
  }
});

let daysObject;

let requestOptions = {
  method: "GET",
  redirect: "follow",
};

let cityName = document.querySelector("#city-name");
let dayData = document.querySelector("#day-data");
let shiftTime;
let degree = "°C";

let appidOWM = "appid=2fa6003f3fcda347972ba089d37340b0";
let keyForecast = "key=dec3e3c95dfe43d7a9850500f486966c";

let lang = "&lang=ru";
let amountDays = "&days=8";

let searchField = document.querySelector(".search");
let btnC = document.querySelector("#btnradio1");
let btnF = document.querySelector("#btnradio2");

var myMap;

sendRequest(cityName, appidOWM, lang, keyForecast, amountDays);

setInterval(function () {
  dayData.textContent = checkTime(shiftTime, "currentTime");
}, 1000);

getWeek();

searchField.addEventListener("keyup", function (event) {
  if (event.code != "Enter" || !this.value.trim()) {
    return;
  }
  if (!cities.find(item => item.name == searchField.value)) {
    return;
  }
  cityName.textContent = searchField.value;
  sendRequest(cityName, appidOWM, lang, keyForecast, amountDays);
  chooseDay(today);

  searchField.value = "";
});

document.querySelector("#autoComplete").addEventListener("selection", function (event) {
  if (!cities.find(item => item.name == event.detail.selection.value.name)) {
    return;
  }
  cityName.textContent = event.detail.selection.value.name;
  sendRequest(cityName, appidOWM, lang, keyForecast, amountDays);
  chooseDay(today);

  searchField.value = "";
});

btnC.addEventListener("click", function () {
  btnC.disabled = true;
  btnF.disabled = false;
  
  fillFields();
  chooseDay(whichSelected());
});

btnF.addEventListener("click", function () {
  btnF.disabled = true;
  btnC.disabled = false;
  
  fillFields();
  chooseDay(whichSelected());
});

colorizeDay(today);

function sendRequest(cityName, appidOWM, lang, keyForecast, amountDays) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      appidOWM +
      lang +
      "&units=metric" +
      "&q=" +
      cityName.textContent,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      
      shiftTime = result.timezone;
      dayData.textContent = checkTime(shiftTime, "currentTime");

    })
    .catch((error) => console.log("error", error));
  fetch(
    "http://api.weatherbit.io/v2.0/forecast/daily?" +
      keyForecast +
      lang +
      "&units=M" +
      "&city=" +
      cityName.textContent +
      amountDays,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      daysObject = result;

      fillFields ();

    })
    .catch((error) => console.log("error", error));
}

function checkTime(shiftTime, param, timestamp = 0) {
  switch (param) {
    case "currentTime":
      return moment((Math.round((Date.now() - 10800000) / 1000) + shiftTime) * 1000).format("dddd, HH:mm");
      break;

    case "timestampTime":
      return moment.unix(timestamp).format("HH:mm");
      break;

    default:
      return moment((Math.round((Date.now() - 10800000) / 1000) + shiftTime) * 1000).format("dddd, HH:mm");
      break;
  }
}

function getWeek() {
  document.querySelector(".title-1").textContent = "Понедельник";
  document.querySelector(".title-2").textContent = "Вторник";
  document.querySelector(".title-3").textContent = "Среда";
  document.querySelector(".title-4").textContent = "Четверг";
  document.querySelector(".title-5").textContent = "Пятница";
  document.querySelector(".title-6").textContent = "Суббота";
  document.querySelector(".title-7").textContent = "Воскресенье";
  
  for (let index = 1; index < today; index++) {
    document.querySelector(`.block-${index} .card-body`).style.visibility =
      "hidden";
    document.querySelector(`.block-${index}`).classList.add('hid');
    document
      .querySelector(`.block-${index}`)
      .style.setProperty("background-color", "#d5d5d5");
  }
  
  for (let index = today; index <= 7; index++) {
    document
      .querySelector(`.block-${index} .card-body`)
      .style.removeProperty("visibility");
    document.querySelector(`.block-${index}`).classList.remove('hid');
    document
      .querySelector(`.block-${index}`)
      .style.removeProperty("background-color");
      document.querySelector(`.block-${index}`).addEventListener('click', () => chooseDay(index));
  }
}

function changeProgress(humidity) {
  let height = fullProgress * humidity + "%";
  document.querySelector(".progress-bar").style.height = height;
}

function createImg(src, className, array) {
  let image = document.createElement("img");
  image.classList.add("card-img-highlights");
  image.src = src;
  return image;
}

function getFahrenheit(temperature) {
  return temperature * 1.8 + 32;
}

function getTemperature(temperature) {
  if (btnC.disabled) {
    degree = "°C";
    return temperature;
  } else if (btnF.disabled) {
    degree = "°F";
    return temperature * 1.8 + 32;
  }
}

function fillFields (ind = 0) {
  cityName.textContent = daysObject.city_name + ", " + daysObject.country_code;

  document.querySelector(".temperature").textContent =
    Math.round(getTemperature(daysObject.data[0].temp)) + degree;

  document.querySelector(".clouds").textContent =
    "Clouds - " + daysObject.data[0].clouds + "%";

  document.querySelector(".big-img").src =
    "https://www.weatherbit.io/static/img/icons/" +
    daysObject.data[0].weather.icon +
    ".png";

    ymaps.ready(getMap);

  for (let index = today; index <= 7; index++) {
    document.querySelector(".img-" + index).src =
      "https://www.weatherbit.io/static/img/icons/" +
      daysObject.data[index].weather.icon +
      ".png";
    document.querySelector(`.block-${index} .card-subtitle`).textContent =
      "д: " +
      Math.round(getTemperature(daysObject.data[index].high_temp)) +
      "° н: " +
      Math.round(getTemperature(daysObject.data[index].low_temp)) +
      "°";
  }

  document.querySelector('.highlights h4').textContent = 'События на ' + moment(daysObject.data[ind].valid_date).format('DD.MM.YYYY');

  document.querySelector(".uv").textContent = daysObject.data[ind].uv;
  scaleUV(daysObject.data[ind].uv);

  document.querySelector(".wind-status").textContent =
    daysObject.data[ind].wind_spd + "m/sec";
  let speedWind = parseInt(
    document.querySelector(".wind-status").textContent,
    10
  );
  scaleBeaufort(speedWind);

  document.querySelector(".sunrise").textContent = checkTime(
    shiftTime,
    "timestampTime",
    daysObject.data[ind].sunrise_ts
  );
  document
    .querySelector(".sunrise")
    .prepend(createImg("img/up.svg", "card-img-highlights"));
  document.querySelector(".sunset").textContent = checkTime(
    shiftTime,
    "timestampTime",
    daysObject.data[ind].sunset_ts
  );
  
  document
    .querySelector(".sunset")
    .prepend(createImg("img/down.svg", "card-img-highlights"));

  document.querySelector(".humidity").textContent = daysObject.data[ind].rh + "%";
  changeProgress(daysObject.data[ind].rh);
  scaleHumidity(daysObject.data[ind].rh);

  document.querySelector(".visibility").textContent =
    Math.round(daysObject.data[ind].vis) + "km";
  scaleVisibility(daysObject.data[ind].vis);

  document.querySelector(".min").textContent =
    Math.round(getTemperature(daysObject.data[ind].min_temp)) + degree;
  document
    .querySelector(".min")
    .prepend(createImg("img/empty.svg", "card-img-highlights"));

  document.querySelector(".max").textContent =
    Math.round(getTemperature(daysObject.data[ind].max_temp)) + degree;
  document
    .querySelector(".max")
    .prepend(createImg("img/notempty.svg", "card-img-highlights"));

}

function calculateInd () {
  let counter = 1;
  for (let index = 1; index <= 7; index++) {
    if (document.querySelector(`.block-${index}`).classList.contains('hid')) {
      counter++;
    }
  }
  return counter;
}

function chooseDay (index) {
  fillFields(index - calculateInd());
  colorizeDay(index);
}

function colorizeDay (index) {
  for (let ind = 1; ind <=7; ind++) {
    if (!document.querySelector(`.block-${ind}`).classList.contains('hid')) {
      document.querySelector(`.block-${ind}`).style.removeProperty("background-color");
      document.querySelector(`.block-${ind}`).classList.remove('selected');
    }
  }
  document.querySelector(`.block-${index}`).style.setProperty("background-color", "#d9eeff");
  document.querySelector(`.block-${index}`).classList.add('selected');
}

function whichSelected () {
  for (let ind = 1; ind <=7; ind++) {
    if (document.querySelector(`.block-${ind}`).classList.contains('selected')) {
      return ind;
    }
  }
}

function getMap (){
  if (myMap) {
    myMap.destroy();
  }

  myMap = new ymaps.Map("map", {
      center: [latitude(), longitude()],
      zoom: 10
  });
}

function latitude () {
  return +(+daysObject.lat).toFixed(2);
}

function longitude () {
  return +(+daysObject.lon).toFixed(2);
}
