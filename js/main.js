const searchBarInput_DOM = document.querySelector(".search-input");
const searchButton_DOM = document.querySelector(".search-button");
const searchBarForm_DOM = document.querySelector(".search-bar-form");

// Add Link/Bookmarks
const addLinkForm_DOM = document.querySelector(".add-link-form");
const addLinkInput_DOM = document.querySelector(".add-link-input");
const mostFrequentlyList_DOM = document.querySelector(".most-frequently-list");

let iconsToDisplay = JSON.parse(localStorage.getItem("iconsToDisplay")) || [];

function randomIndexGenerator(def = 10){
    return Math.floor(Math.random() * def)
}

function setBackground(event){
    // document.body.style.background = `url("../img/${randomIndexGenerator() + 1}.jpg") no-repeat`;
    document.body.style.background = `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url("../img/2.jpg") no-repeat center top`;
    document.body.style.backgroundSize = "auto"
}

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
        spanUsername.textContent = userInputElement.value === "" ? user : userInputElement.value ;
        localStorage.setItem("user",userInputElement.value === "" ? user : userInputElement.value)
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
        <p>
        - By <span class="author">${quoteObj.author}</span>
        </p>
    </div>
    `
}

function autoFocusAtSearchBar(){
    searchBarInput_DOM.focus()
}

function searchStringAndOpenGoogle(query){
    url = `http://www.google.com/search?q=${query}`;
    window.open(url,"_self");
}

function handleClickOnSearchButton(e){
    e.preventDefault()
    const query = searchBarInput_DOM.value;
    searchStringAndOpenGoogle(query);

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
                <span class="icon-delete"><i class="fas fa-minus-circle"></i></span>
            </li>
        `
    }).join("");
}

addLinkForm_DOM.addEventListener("submit",function(e){
    e.preventDefault();
    this.classList.remove("display-add-link-form");
    const linkVal = addLinkInput_DOM.value;
    const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i

    addLinkInput_DOM.value = ""
    if(regex.test(linkVal)){
        console.log("entered")
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
        console.log(socialIcon)
        if(socialIcon.length){
            let {key,val} = socialIcon[0]
            icon = val;
        } else {
            firstChar = firstChar.toLowerCase();
            let index = firstChar.charCodeAt() - 97;
            icon = icons[index];
        }
        if(iconsToDisplay.length <= 8){
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



document.body.addEventListener("click",function(e){
    handleClickOnAddLinkButton(e);
    handleClickOnDeleteLinkButton(e);
})


window.addEventListener("load",(event) => {
    setBackground(event);
    setTime();
    setGreeting();
    setQuote();
    autoFocusAtSearchBar();
    createIcons();

});

setInterval(() => {
   setTime();
   setGreeting();
},1000)


