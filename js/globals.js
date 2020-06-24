//time-name-container DOM variables
const timeVal_DOM = document.querySelector(".time-val");
const greetingVal_DOM = document.querySelector(".greeting");
const username_DOM = document.querySelector(".username");
const greetingWrapper_DOM = document.querySelector(".greeting-wrapper");

// Globals
const user = localStorage.getItem("user") || "Username";
let backUrl = localStorage.getItem("backUrl") || "../img/1.jpg"
let iconsToDisplay = JSON.parse(localStorage.getItem("iconsToDisplay")) || [];
let selectedUrl = (localStorage.getItem("selectedUrl")) || "google";
