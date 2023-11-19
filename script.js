// querySelector gebruikt css selectors
const cookieElement = document.querySelector("#cookie-image");
const scoreElement = document.getElementById('score');
const upgradesElement = document.querySelector("#c-upgrades");


let currentScore = 0;
let incrementCookies = 1;
let incrementCookiesPerSecond = 0;

// Functions
const handleCookieClicked = () => {
    currentScore += incrementCookies 
    // dit is hetzelfde als:
    // currentScore = currentScore + 1

    // we gebruiken hier innerText ipv innerHtml, dat is veiliger
    scoreElement.innerText = currentScore;
}

setInterval(() => {
    currentScore += incrementCookiesPerSecond
    scoreElement.innerText = currentScore;

}, 1000);

// als we arrow functies gebruiken moeten we de functie eerst declareren want: https://www.w3schools.com/js/js_hoisting.asp
cookieElement.addEventListener('click', handleCookieClicked)


class Upgrade {
    parentElement = upgradesElement;
    element;
    displayText;
    count = 0;
    cost;
    uniqueId;
    html = '';
    handle;


    constructor(displayText, cost, uniqueId, handle) {
        this.displayText = displayText; 
        this.cost = cost; // de kostprijs
        this.handle = handle; // wat er moet gebeuren bij deze upgrade
        this.uniqueId = uniqueId;
    }

    draw = () => {
        this.updateHtml();
        this.parentElement.insertAdjacentHTML('beforeend', this.html);

        // get the current element
        const children = [...this.parentElement.children]
        this.element = children.find(child => child.dataset.id == this.uniqueId)
        console.log(this.element)

        this.element.addEventListener('click', this.handleClick)

    }

    updateHtml = () => {
        this.html = `
        <button class="c-upgrade" data-id="${this.uniqueId}">
            <span class="c-upgrade__text js-upgrade">${this.displayText}</span>
            <span>(${this.cost})</span>
        </button>
        `;
    }

    removeHtml = () => {
        const allUpdates =  this.parentElement.children;
        // console.log(allUpdates)
        const thisUpgrade = [...allUpdates].find(upgrade => upgrade.dataset.id == this.uniqueId)
        console.log(thisUpgrade)
        thisUpgrade.remove();
    }

    handleClick = () => {
        if (currentScore < this.cost) {
            alert("te weinig koekjes")
        } else {
            currentScore -= this.cost
            this.handle();

            this.removeHtml();
            this.draw();
        }
    }


}

const upgrades = [];

// upgrades array vullen met de upgrades
upgrades.push(new Upgrade("+1 / CLICK", 1, 1, function() {
    incrementCookies += 1;
}));
upgrades.push(new Upgrade("+1 TRAINEE", 5, 2, function() {
    incrementCookiesPerSecond += 1;
    this.cost = this.cost * 2
}));


// teken de upgrade
upgrades.forEach(upgrade => upgrade.draw())

