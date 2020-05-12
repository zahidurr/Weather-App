/* Global Variables */
// OpenWeatherMap API & Key
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=YOUR-API-KEY";
const serverURL = "http://127.0.0.1:8080";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document
  .getElementById("generate")
  .addEventListener("click", generateSubmitted);

/* Event listener callback */
function generateSubmitted(e) {
  e.preventDefault();
  // user input
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  getAPIData(baseURL, zip, apiKey).then(function (data) {
    console.log(newDate);

    postData("/add", { date: newDate, temp: data.main.temp, content });
    update();
  });
}

/* GET Data */
const getAPIData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    return await res.json();
  } catch (error) {
    console.log("error", error);
  }
};

/* POST data */
const postData = async (url = "", data = {}) => {
  const req = await fetch(serverURL + url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    return await req.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (url = "/all") => {
  const request = await fetch(serverURL + url);
  try {
    const data = await request.json();
    // update values
    document.getElementById("date").innerHTML = data.date;
    document.getElementById("temp").innerHTML = data.temp;
    document.getElementById("content").innerHTML = data.content;
  } catch (error) {
    console.log("error", error);
  }
};
