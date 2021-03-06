const searchBarInput_DOM = document.querySelector(".search-input");
const searchButton_DOM = document.querySelector(".search-button");
const searchBarForm_DOM = document.querySelector(".search-bar-form");

// Add Link/Bookmarks
const addLinkForm_DOM = document.querySelector(".add-link-form");
const addLinkInput_DOM = document.querySelector(".add-link-input");
const mostFrequentlyList_DOM = document.querySelector(".most-frequently-list");

// Background Image Changer
const backgroundForm_DOM = document.querySelector(".bg-img-form");
const backgroundInput_DOM =  document.querySelector(".bg-img-input");

// Default theme icon
const defaultThemeIcon_DOM = document.querySelector(".default-theme");
const todoSection_DOM = document.querySelectorAll(".todo-section");

// Weather Container
const weather_DOM = document.querySelector(".weather-container");
const weatherToggler_DOM = document.querySelector(".weather-toggler");



function randomIndexGenerator(def = 10){
    return Math.floor(Math.random() * def)
}

// function setBackground(event){
//     // document.body.style.background = `url("../img/${randomIndexGenerator() + 1}.jpg") no-repeat`;
//     document.body.style.background = `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url("../img/2.jpg") no-repeat center top`;
//     document.body.style.backgroundSize = "cover"
// }

function setTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = `${date.getMinutes()}`.length < 2 ? `${date.getMinutes()}`.padStart(2,"0") : `${date.getMinutes()}`;
    timeVal_DOM.innerHTML = `${hours}:${minutes}`;
}

function setGreeting(){
    const date = new Date();
    const hours = date.getHours();
    let greeting = "";
    switch(true){
        case hours >= 0  && hours <= 11:
            greeting = "Good Morning, ";
            break;
        case hours >= 12 && hours <= 17:
            greeting = "Good Afternoon, ";
            break;
        default:
            greeting = "Good Evening, ";
    }
    greetingVal_DOM.innerHTML = greeting;

}

// Inputting the name by the user.
function handleDoubleClickOnName(e){
    const elementClicked = e.target.closest(".username");
    if(!elementClicked) return;
    const greetingWrapper = elementClicked.parentElement;
    const enterName = document.createElement("input");
    enterName.className = "username-input";
    greetingWrapper.replaceChild(enterName,elementClicked);
    enterName.focus();
}


document.body.addEventListener("dblclick",function(e){
    handleDoubleClickOnName(e);
})

function handleBlurForUsernameInput(e){
    if(e.target.closest(".username-input") && e.type === "focusout"){
        const userInputElement = e.target.closest(".username-input");
        const spanUsername = document.createElement("span");
        spanUsername.className = "username";
        spanUsername.textContent = userInputElement.value.trim() === "" ? user : userInputElement.value ;
        localStorage.setItem("user",userInputElement.value.trim() === "" ? user : userInputElement.value)
        const greetingWrapper = userInputElement.parentElement;
        greetingWrapper.replaceChild(spanUsername,userInputElement);
    }
}

function handleBlurForEnterPressOnUsernameInput(e){
    if (
        event.target.closest(".username-input") &&
        event.type === "keyup" &&
        event.keyCode === 13
      ) {
        event.target.closest(".username-input").blur();
      }
}

greetingWrapper_DOM.addEventListener("focusout",handleBlurForUsernameInput);
greetingWrapper_DOM.addEventListener("keyup",handleBlurForEnterPressOnUsernameInput)

username_DOM.innerHTML = `${user}`;


function setQuote(){
    let randomId = Math.floor(randomIndexGenerator(quotes.length))
    const quoteObj = quotes[randomId];
    document.querySelector(".quotes-section").innerHTML = `
    <div class="quotes-container flex">
        <q class="quote">
            ${quoteObj.text} 
        </q>
 
       
        
    </div>
    `
}

function autoFocusAtSearchBar(){
    searchBarInput_DOM.focus()
}

function searchStringAndOpen(websiteToSearchAt,query){
    let urls = {
        "google":"http://www.google.com/search?q=",
        "mdn":"https://developer.mozilla.org/en-US/search?q=",
        "csstricks":"https://css-tricks.com/?s=",
        "stackoverflow":"https://stackoverflow.com/search?q=",
        "duckduckgo":"https://duckduckgo.com/?q=",
        "quora":"https://www.quora.com/search?q=",
        "reddit":"https://www.reddit.com/search?q=",
        "medium":"https://medium.com/search?q="
    }

    url = urls[websiteToSearchAt] + query;
    window.open(url,"_self");
}

function handleClickOnSearchButton(e){
    e.preventDefault()
    const query = searchBarInput_DOM.value;
    const websiteToSearchAt = document.querySelector(".custom-select .selected").dataset.value;
    searchStringAndOpen(websiteToSearchAt,query);

}

searchBarForm_DOM.addEventListener("submit",function(e){
    handleClickOnSearchButton(e)
})


function handleClickOnAddLinkButton(e){
    let element = e.target.closest(".add-link");
    if(!element) return;
    addLinkForm_DOM.classList.toggle("display-add-link-form");
}

function createIcons(iconsArr = iconsToDisplay){
    mostFrequentlyList_DOM.innerHTML = "";
    mostFrequentlyList_DOM.innerHTML = iconsArr.map(iconObj => {
        return `
            <li class="li-link-item">
                <a class="mfv-links user-link" href="${iconObj.link}">${iconObj.icon}</a>
                <span class="icon-delete">
                    <img src="../img/icons/minus-circle.svg" alt="Remove Bookmark">
                </span>
            </li>
        `
    }).join("");
    mostFrequentlyList_DOM.innerHTML += `
        <li>
            <a class="mfv-links" href="https://twitter.com">
                <img src="../img/icons/twitter.svg" alt="Twitter">
            </a>
        </li>
        <li>
            <a class="mfv-links" href="https://www.instagram.com/">
                <img src="../img/icons/instagram.svg" alt="Instagram">
            </a>
        </li>
    `
}

addLinkForm_DOM.addEventListener("submit",function(e){
    e.preventDefault();
    this.classList.remove("display-add-link-form");
    const linkVal = addLinkInput_DOM.value;
    const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i

    addLinkInput_DOM.value = ""
    if(regex.test(linkVal)){

        let firstChar;
        let icon = ""
        if(!linkVal.includes("www.")){
            firstChar = linkVal.split("//")[1][0];
        } else {
            firstChar = linkVal[linkVal.indexOf("www.") + 4];
        }
        const socialIcon = socialIcons.filter(socialIcon => {
            let {key,val} = socialIcon;
            return linkVal.includes(key)
        })
        if(socialIcon.length){
            let {key,val} = socialIcon[0]
            icon = val;
        } else {
            firstChar = firstChar.toLowerCase();
            let index = firstChar.charCodeAt() - 97;
            icon = icons[index];
        }
        if(iconsToDisplay.length <= 6){
            iconsToDisplay.push({
                link:linkVal,
                icon
            });
        }
        localStorage.setItem("iconsToDisplay",JSON.stringify(iconsToDisplay));
        createIcons();
    } else {

    }
})



function handleClickOnDeleteLinkButton(e){
    let element = e.target.closest(".icon-delete");
    if(!element) return;
  
    let getLink = element.previousElementSibling.href;
  
    iconsToDisplay = iconsToDisplay.filter(iconObj => iconObj.link !== getLink);
    
    localStorage.setItem("iconsToDisplay",JSON.stringify(iconsToDisplay));
    createIcons();
}

function handleClickOnImageChangerIcon(e){
    let element = e.target.closest(".image-changer-icon");
    if(!element) return;
    backgroundForm_DOM.classList.toggle("bg-img-form-display");
    
}

function handleClickOnDisplayDefaultTheme(e){
    let element = e.target.closest(".default-theme");
    if(!element) return
    localStorage.setItem("backUrl","../img/1.jpg");
    document.body.style.background = `url("../img/1.jpg")`;
    document.body.style.backgroundSize = `cover`;
    document.body.style.backgroundRepeat = "no-repeat";
    defaultThemeIcon_DOM.style.display = "none";
}

function handleClickOnDropdown(e){
    if(!e.target.closest(".custom-option"))return;
    let selectedOption = e.target.closest(".custom-option");
    localStorage.setItem("selectedUrl",selectedOption.dataset.value);
}

function handleClickOnWeatherToggler(e){
    if(!e.target.closest(".weather-toggler")) return;
    let weatherToggler = e.target.closest(".weather-toggler");
    weather_DOM.classList.toggle("weather-hide");
}



document.body.addEventListener("click",function(e){
    handleClickOnAddLinkButton(e);
    handleClickOnDeleteLinkButton(e);
    handleClickOnImageChangerIcon(e);
    handleClickOnDisplayDefaultTheme(e);
    handleClickOnDropdown(e);
    handleClickOnWeatherToggler(e);
})

// backgroundImage changer;
backgroundForm_DOM.addEventListener("submit",function(e){
    e.preventDefault();
    const linkVal = backgroundInput_DOM.value;
    const regexImgChecker = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
    if(regexImgChecker.test(linkVal) || linkVal.includes("images.unsplash.com/photo") ){
        //|| linkVal.includes("data:image") || linkVal.includes("https://encrypted-tbn0.gstatic.com/images") support for other images
        // document.body.style.background = backUrl; fallback background
        document.body.style.background = `url("${linkVal}")`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        localStorage.setItem("backUrl",linkVal);
        backgroundInput_DOM.value = "";
        backgroundForm_DOM.classList.remove("bg-img-form-display");
        defaultThemeIcon_DOM.style.display = "block";
    } else {
        backgroundInput_DOM.value = "";
        backgroundForm_DOM.classList.remove("bg-img-form-display");
    }
})

function setBackground(){
    document.body.style.background = `url(${backUrl})`;
    document.body.style.backgroundSize = `cover`;
    document.body.style.backgroundRepeat = "no-repeat";
}

function showDefaultThemeIconIfBackChanged(){
    if(backUrl !== "../img/1.jpg") defaultThemeIcon_DOM.style.display = "block";
}

function selectDefaultUrl(){
    let allOptions = [...document.querySelectorAll(".custom-option")];
    allOptions.forEach(customOption => customOption.classList.contains("selected") ? customOption.classList.remove("selected") : "");
    allOptions.forEach(option => option.dataset.value === selectedUrl ? option.classList.add("selected") : "");
    let getTextToDisplay = document.querySelector(".selected").textContent;
 
    document.querySelector(".custom-select__trigger span").innerText = getTextToDisplay;
}

function setLocationAndWeather(){
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else { 
          weather_DOM.innerHTML = "";
        }
      }

    function showPosition(position) {   
        const lat = position.coords.latitude ;
        const lon = position.coords.longitude;
        const weatherData = 
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=233403ff99956b6da6b27cc48c6617ef`)
        .then( data => data.json())
        .then( res => {
            
            if(res.cod = "200"){
                if(weatherToggler_DOM.classList.contains("hide-weather-toggler")) weatherToggler_DOM.classList.add("show-weather-toggler");
                const temperature = +res.list[0].main.temp - 273.15;
                const weatherIcon = res.list[0].weather[0].icon;
                weather_DOM.innerHTML = `
                    <div class="flex weather-content">
                        <span class="weather-icon">
                            <img src="../img/weather-icons/${weatherIcon}.png">
                        </span>
                        <div class="temperature">
                            ${temperature.toFixed(1)} &#8451;
                        </div>
                    </div>
                `
              
              
               
            } else if(res.cod === "429"){
                weather_DOM.innerHTML = "";
                weatherToggler_DOM.classList.add("hide-weather-toggler");
            }
        });
    }

    function showError(error){
        weather_DOM.innerHTML = "";
    }

    getLocation()
}


window.addEventListener("load",(event) => {
    
    // setBackground(event);
    setBackground();
    setTime();
    setGreeting();
    setQuote();
    autoFocusAtSearchBar();
    createIcons();
    showDefaultThemeIconIfBackChanged();
    selectDefaultUrl();
    setLocationAndWeather()
});

setInterval(() => {
   setTime();
   setGreeting();
},1000)


