// Get values from local storage or set default values
var level = parseInt(localStorage.getItem("level")) || 1;
var experience = parseInt(localStorage.getItem("experience")) || 0;
var money = parseInt(localStorage.getItem("money")) || 0;
var respect = parseInt(localStorage.getItem("respect")) || 0;
var inventory = JSON.parse(localStorage.getItem("inventory")) || [];
var stocks = JSON.parse(localStorage.getItem("stocks")) || [
    { name: "Dogecoin", price: 100, originalPrice: 100 },
    { name: "Ethereum", price: 500, originalPrice: 500 },
    { name: "Bitcoin", price: 1000, originalPrice: 1000 }
];
// Get the player name from local storage
var playerName = localStorage.getItem("playerName");

// Get the player name and health bar elements
const playerNameElement = document.getElementById("player-name");
const healthBarElement = document.getElementById("health-bar-inner");
const healthTextElement = document.querySelector(".health-text");

// Get the notification element
const notificationElement = document.getElementById("notification");

// Check if there is a playerName value saved in localStorage
if (!playerName) {
    // If not, show the notification and ask the user to enter their name
    notificationElement.textContent = "Please enter your name:";
    notificationElement.style.display = "block";

    // Create an input element for the user to enter their name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name-input";
    notificationElement.appendChild(nameInput);

    // Create a button for the user to submit their name
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    notificationElement.appendChild(submitButton);

    // Add an event listener to the submit button
    submitButton.addEventListener("click", () => {
        // Get the value entered by the user
        const nameValue = nameInput.value;

        // Check if the value is between 4 and 12 characters long
        if (nameValue.length < 4 || nameValue.length > 12) {
          gameLog.innerHTML = "<span style='color: cyan; font-weight: bold;'>Name must be between 4 and 12 characters long.</span>";
            gameLog.scrollTop = gameLog.scrollHeight;
            return;
        }

        // Check if the value contains only letters and numbers
        if (!/^[a-zA-Z0-9]+$/.test(nameValue)) {
          gameLog.innerHTML = "<span style='color: cyan; font-weight: bold;'>Name must contain only letters and numbers.</span>";
            gameLog.scrollTop = gameLog.scrollHeight; 
            return;
        }

        // If the value passes validation, save it as the player name
        playerName = nameValue;

        // Save the player name to local storage
        localStorage.setItem("playerName", playerName);

        // Update the player name element
        playerNameElement.textContent = playerName;

        // Hide the notification
        notificationElement.style.display = "none";
    });
} else {
    // If there is a playerName value saved in localStorage, update the player name element
    playerNameElement.textContent = playerName;
}


// Set the initial player name and health
let health = parseInt(localStorage.getItem("health")) || 100;

// Update the player name and health bar
healthBarElement.style.width = health + "%";
healthTextElement.textContent = health;


// Format money and respect with commas
var moneyWithCommas = money.toLocaleString("en-US");
var respectWithCommas = respect.toLocaleString("en-US");

// Get DOM elements
var moneySpan = document.getElementById("money");
var respectSpan = document.getElementById("respect");
var gameLog = document.getElementById("game-log");
var inventoryList = document.getElementById("inventory-list");

updateInventoryList();
updateStockPricesList();

document.getElementById("level").innerHTML = level;
document.getElementById("experience").innerHTML = experience;
document.getElementById("money").innerHTML = moneyWithCommas;
document.getElementById("respect").innerHTML = respectWithCommas;

// Add event listeners to buttons
addButtonEventListener(1);
addButtonEventListener(2);
addButtonEventListener(3);

function addButtonEventListener(buttonId) {
    document.querySelector(`#button-${buttonId}`).addEventListener('click', function() {
        var dropdownContent = document.querySelector(`#button-${buttonId} + .dropdown-content`);
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        } else {
            dropdownContent.style.display = 'block';
        }
    });
}

// Update the inventory list
function updateInventoryList() {
    // Clear the current contents of the inventory list
    inventoryList.innerHTML = '';

    // Group the inventory items by name and sum their quantities
    var groupedInventory = {};
    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];
        if (groupedInventory[item.name]) {
            groupedInventory[item.name] += item.quantity;
        } else {
            groupedInventory[item.name] = item.quantity;
        }
    }

    // Add each item in the grouped inventory to the list
    for (var itemName in groupedInventory) {
        var item = document.createElement('li');
        item.textContent = itemName + ' (' + groupedInventory[itemName] + ')';
        inventoryList.appendChild(item);
    }
}

// Update the list of owned stocks
function updateStocksOwnedList() {
    var stocksOwnedList = document.getElementById("stocks-owned-list");
    stocksOwnedList.innerHTML = "";

    for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];
        var stock = stocks.find(function(stock) {
            return stock.name === item.name;
        });

        if (stock) {
            var stockOwnedItem = document.createElement("li");
            stockOwnedItem.textContent = stock.name + ": " + item.quantity + " shares";
            stocksOwnedList.appendChild(stockOwnedItem);
        }
    }
}

updateStocksOwnedList();
setInterval(updateStocksOwnedList, 1000);

let canClickRob = true;
let robCountdownTimer;
let lastMessageTime; // variable to keep track of the time of the last message
let messageDelay = 2000; // delay between messages in milliseconds

document.getElementById("rob-button").addEventListener("click", function() {
    if (canClickRob) {
        canClickRob = false;
      document.getElementById("rob-button").style.backgroundColor = "gray";
        lastMessageTime = new Date().getTime(); // set the initial value of lastMessageTime to the current time
        let timeLeft = Math.floor(Math.random() * (7000 - 1000) + 1000);
        let robProgressBar = document.getElementById("rob-progress-bar");
        robProgressBar.style.width = "0%";
        let totalTime = timeLeft;
        let intervalTime = 10;
        robCountdownTimer = setInterval(() => {
            timeLeft -= intervalTime;
            let percentage = ((totalTime - timeLeft) / totalTime) * 100;
            robProgressBar.style.width = percentage + "%";
            if (timeLeft <= 0) {
                clearInterval(robCountdownTimer);
                canClickRob = true; // reset canClickRob to true
                document.getElementById("rob-button").style.backgroundColor = "#008DB9";
                var successChance = Math.random() - (respect * 0.0001); // subtract respect divided by 10 from the success chance
                if (successChance < 0.5) {
                    var moneyGained = Math.floor(Math.random() * 85) + 1;
                    money += moneyGained;
                    moneyWithCommas = money.toLocaleString("en-US");
                    moneySpan.innerHTML = moneyWithCommas;
                     saveGame(); // save game after gym timer has finished and respect has been gained
        
        
                    // Increment experience by a random amount
                    var experienceGained = Math.floor(Math.random() * 10) + 1;
                    experience += experienceGained;
        
                   // Update local storage
                   localStorage.setItem('level', level);
                   localStorage.setItem('experience', experience);
        
                   // Update game log
                   gameLog.innerHTML += "<p>You <span style='color: #00A300; font-weight: bold;'>successfully</span> robbed a store and gained <span style='color:#00A300; font-weight:bold;'>$" + moneyGained + "</span> and <span style='color:#008DB9; font-weight:bold;'>" + experienceGained + " experience</span>.</p>";
                   gameLog.scrollTop = gameLog.scrollHeight;
        
                    // Check if player has leveled up
                    let experienceNeeded = 50 * level;
                    if (experience >= experienceNeeded) {
                        level += 1;
                        experience -= experienceNeeded;
  
                    // Add 5 health to the player's health bar
                    health += 5;

                   // Save the new value of health to local storage
                      localStorage.setItem('health', health);
    
                    // Update game log
                    var newLogEntry = document.createElement("li");
                    newLogEntry.innerHTML = "You leveled up! You are now level <span style='color:#FF69B4; font-weight:bold;'>" + level + "</span>. You gained <span style='color:#FF69B4; font-weight:bold;'>5 health</span>.";
                     gameLog.appendChild(newLogEntry);
                     }

                    // Update HTML elements
                    document.getElementById("level").innerHTML = level;
                    document.getElementById("experience").innerHTML = experience;

                    // Update the player's health bar
                    healthBarElement.style.width = health + "%";
                    healthTextElement.textContent = health;
                   saveGame();


                } else {
                    var moneyLost = Math.floor(Math.random() * 50) + 1;
                    if (moneyLost <= money) {
                        money -= moneyLost;
                        gameLog.innerHTML += "<p>You <span style='color: red; font-weight: bold;'>failed</span> to rob a store and <span style='color: red; font-weight: bold;'>lost</span> $<span style='color: red; font-weight:bold;'>" + moneyLost + "</span>. You didn't gain any experience.</p>";
                    } else {
                        money = 0;
                        gameLog.innerHTML += "<p>You <span style='color: red; font-weight: bold;'>failed</span> to rob a store and <span style='color: red; font-weight: bold;'>lost</span> all your remaining <span style='color: #00A300; font-weight: bold;'>Money</span>. You didn't gain any <span style='color: #008DB9; font-weight: bold;'>Experience</span>.</p>";
                    }
                    moneyWithCommas = money.toLocaleString("en-US");
                    moneySpan.innerHTML = moneyWithCommas;
                    gameLog.scrollTop = gameLog.scrollHeight;
                    saveGame(); // save game after adding message to game log
                }
            }
        }, intervalTime);
                
    } else { // player clicked too fast
        let currentTime = new Date().getTime(); // get the current time
        if (currentTime - lastMessageTime >= messageDelay) { // check if enough time has passed since the last message
            let messages = [
                "Whoa there, speedy fingers! Slow down a bit.",
                "Easy tiger, give the button a break!",
                "Hold your horses, no need to rush!",
                "Patience is a virtue, slow down on the clicking.",
                "Slow and steady wins the race, take it easy on the clicks."
            ];
            let message = messages[Math.floor(Math.random() * messages.length)];
            let messageElement = document.createElement("p");
            messageElement.innerHTML = message;
            messageElement.style.color = "red"; // set the color of the message to red
            gameLog.appendChild(messageElement); // add random colored message to game log
            gameLog.scrollTop = gameLog.scrollHeight; // scroll to bottom of game log
            lastMessageTime = currentTime; // update the time of the last message
            saveGame(); // save game after adding message to game log

        }
    }
});


document.getElementById("sell-drugs-button").addEventListener("click", function() {
    var drugsToSell = prompt("How many drugs would you like to sell?", "0");
    
    // Make sure that the number of drugs being sold is less than or equal to the number of drugs in the inventory
    var drugsInInventory = inventory.filter(function(item) { return item.name === 'Drug'; }).length;
    if (drugsToSell > drugsInInventory) {
        drugsToSell = drugsInInventory;
    }
    
    if (drugsToSell > 0) {
        var moneyGained = drugsToSell * Math.floor(Math.random() * 20);
        money += moneyGained;
        moneyWithCommas = money.toLocaleString("en-US");
        moneySpan.innerHTML = moneyWithCommas;
        gameLog.innerHTML += "<p>You sold <span style='color: #008DB9; font-weight: bold;'>" + drugsToSell + "</span> drugs and gained <span style='color: #00A300; font-weight: bold;'>$" + moneyGained + "</span>.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
        
        // Remove the sold drugs from the inventory
        for (var i=0; i<drugsToSell; i++) {
            var index = inventory.findIndex(function(item) { return item.name === 'Drug'; });
            if (index > -1) {
                inventory.splice(index, 1);
            }
        }
        // Update the inventory in local storage and on the page
        localStorage.setItem('inventory', JSON.stringify(inventory));
        updateInventoryList();
        
    } else {
        gameLog.innerHTML += "<p>You didn't sell any drugs.</p>";
    }
    saveGame();
});


document.getElementById("buy-drugs-button").addEventListener("click", function() {
    var drugsToBuy = prompt("How many drugs would you like to buy?", "0");
    if (drugsToBuy > 0) {
        var moneyLost = drugsToBuy * Math.floor(Math.random() * 20);
        if (moneyLost <= money) {
            money -= moneyLost;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You bought <span style='color: #008DB9; font-weight: bold;'>" + drugsToBuy + "</span> drugs and lost <span style='color: red; font-weight: bold;'>$" + moneyLost + "</span>.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
            
            // Add the bought drugs to the inventory
            for (var i=0; i<drugsToBuy; i++) {
                inventory.push({ name: 'Drug', quantity: 1 });
            }
        // Update the inventory in local storage and on the page
            localStorage.setItem('inventory', JSON.stringify(inventory));
            updateInventoryList();
        } else {
            gameLog.innerHTML += "<p>You don't have enough money to buy that many drugs.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        }
    } else {
        gameLog.innerHTML += "<p>You didn't buy any drugs.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
    }
    saveGame();
});


let canClickGym = true;
let gymCountdownTimer;

document.getElementById("gym-button").addEventListener("click", function() {
    if (canClickGym) {
        canClickGym = false;
        document.getElementById("gym-button").style.backgroundColor = "gray";
        lastMessageTime = new Date().getTime(); // set the initial value of lastMessageTime to the current time
        let timeLeft = Math.floor(Math.random() * (7000 - 1000) + 1000);
        let gymProgressBar = document.getElementById("gym-progress-bar");
        gymProgressBar.style.width = "0%";
        let totalTime = timeLeft;
        let intervalTime = 10;
        gymCountdownTimer = setInterval(() => {
            timeLeft -= intervalTime;
            let percentage = ((totalTime - timeLeft) / totalTime) * 100;
            gymProgressBar.style.width = percentage + "%";
            if (timeLeft <= 0) {
                clearInterval(gymCountdownTimer);
                canClickGym = true; // reset canClickGym to true
                document.getElementById("gym-button").style.backgroundColor = "#B29600";
                var respectGained = Math.floor(Math.random() * 10) + 1;
                respect += respectGained;
                respectWithCommas = respect.toLocaleString("en-US");
                respectSpan.innerHTML = respectWithCommas;
                gameLog.innerHTML += "<p>You went to the gym and gained <span style='color: yellow;; font-weight:bold;'>" + respectGained + "</span> respect.</p>";
                gameLog.scrollTop = gameLog.scrollHeight;
                localStorage.setItem('respect', respect);
                saveGame(); // save game after gym timer has finished and respect has been gained
            }
        }, intervalTime);

    } else { // player clicked too fast
        let currentTime = new Date().getTime(); // get the current time
        if (currentTime - lastMessageTime >= messageDelay) { // check if enough time has passed since the last message
            let messages = [
                "Whoa there, speedy fingers! Slow down a bit.",
                "Easy tiger, give the button a break!",
                "Hold your horses, no need to rush!",
                "Patience is a virtue, slow down on the clicking.",
                "Slow and steady wins the race, take it easy on the clicks."
            ];
            let message = messages[Math.floor(Math.random() * messages.length)];
            let messageElement = document.createElement("p");
            messageElement.innerHTML = message.bold();
            messageElement.style.color = "red"; // set the color of the message to red
            gameLog.appendChild(messageElement); // add random colored message to game log
            gameLog.scrollTop = gameLog.scrollHeight; // scroll to bottom of game log
            lastMessageTime = currentTime; // update the time of the last message
            saveGame(); // save game after adding message to game log
        }
    }
});


document.getElementById("gamble-button").addEventListener("click", function() {
    this.disabled = true;
    setTimeout(() => {
        this.disabled = false;
    }, Math.random() * (6000 - 1000) + 1000);
    var betAmount = parseInt(prompt("How much money would you like to bet?", "0"));
    if (betAmount > 0 && betAmount <= money) {
        var winChance = Math.random();
        if (winChance < 0.5) {
            var moneyGained = betAmount * 2;
            money += moneyGained;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You won <span style='color: #00A300; font-weight: bold;'>$" + moneyGained + "</span> from gambling.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        } else {
            money -= betAmount;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You lost <span style='color: red; font-weight: bold;'>$" + betAmount + "</span> from gambling.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        }
        saveGame();
  } else {
        gameLog.innerHTML += "<p>Invalid bet amount.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
    }
});


function updateStockPrices() {
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var priceChange = Math.floor(Math.random() * 20) - 10;
        stock.price += priceChange;
        var minPrice = stock.originalPrice * 0.25; // Calculate the minimum price as 25% of the original price
        if (stock.price < minPrice) {
            stock.price = minPrice;
        }
    }
    localStorage.setItem("stocks", JSON.stringify(stocks)); // Save the updated stocks array to localStorage
}


function buyStock(stockName, quantity) {
    var stock = stocks.find(function(stock) {
        return stock.name === stockName;
    });
    if (stock) {
        var cost = stock.price * quantity;
        if (cost <= money) {
            money -= cost;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You bought <span style='color: #008DB9; font-weight: bold;'>" + quantity + "</span> shares of <span style='color: yellow; font-weight: bold;'>" + stockName + "</span> for <span style='color: red; font-weight: bold;'>$" + cost + "</span>.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
            var stockInInventory = inventory.find(function(item) {
                return item.name === stockName;
            });
            if (stockInInventory) {
                stockInInventory.quantity += quantity;
            } else {
                inventory.push({ name: stockName, quantity: quantity });
            }
            updateInventoryList();
            saveGame();
        } else {
            alert("You don't have enough money to buy that many shares.");
        }
    } else {
        gameLog.innerHTML += "<p>Invalid stock name.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
      }
    }


    function sellStock(stockName, quantity) {
        var stock = stocks.find(function(stock) {
          return stock.name === stockName;
        });
        if (stock) {
          var stockInInventory = inventory.find(function(item) {
            return item.name === stockName;
          });
          if (stockInInventory && stockInInventory.quantity >= quantity) {
            var revenue = stock.price * quantity;
            money += revenue;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You sold <span style='color: #008DB9; font-weight: bold;'>" + quantity + "</span> shares of <span style='color: yellow; font-weight: bold;'>" + stockName + "</span> for $<span style='color: green; font-weight: bold;'>" + revenue + "</span>.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
            stockInInventory.quantity -= quantity;
            if (stockInInventory.quantity === 0) {
              inventory.splice(inventory.indexOf(stockInInventory), 1);
            }
            updateInventoryList();
            saveGame();
          } else {
            gameLog.innerHTML += "<p>You don't have that many shares to sell.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
          }
        } else {
          gameLog.innerHTML += "<p>Invalid stock name.</p>";
          gameLog.scrollTop = gameLog.scrollHeight;
        }
      }

document.getElementById("buy-stock-button").addEventListener("click", function() {
    var stockName = prompt("Which stock would you like to buy?", "");
    if (stockName !== null) {
        var quantity = parseInt(prompt("How many shares would you like to buy?", "0"));
        if (quantity > 0) {
            buyStock(stockName, quantity);
        } else {
            gameLog.innerHTML += "<p>Invalid quantity.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        }
    } else {
        gameLog.innerHTML += "<p>You didn't buy any stock.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
    }
});


document.getElementById("sell-stock-button").addEventListener("click", function() {
    var stockName = prompt("Which stock would you like to sell?", "");
    if (stockName !== null) {
        var quantity = parseInt(prompt("How many shares would you like to sell?", "0"));
        if (quantity > 0) {
            sellStock(stockName, quantity);
        } else {
            gameLog.innerHTML += "<p>Invalid quantity.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        }
    } else {
        gameLog.innerHTML += "<p>You didn't sell any stock.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
    }
});


function updateStockPricesList() {
    var stockPricesList = document.getElementById("stock-prices-list");
    stockPricesList.innerHTML = "";
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var stockPriceItem = document.createElement("li");
        stockPriceItem.textContent = stock.name + ": $" + stock.price.toLocaleString();
        stockPricesList.appendChild(stockPriceItem);
    }
}
setInterval(updateStockPricesList, 1000);
setInterval(updateStockPrices, 5000);


document.getElementById("toggle-buttons").addEventListener("click", function() {
    var buttonsContainer = document.getElementById("save-load-reset-menu");
    buttonsContainer.classList.toggle("buttons-hidden");
});

document.getElementById("save-button").addEventListener("click", function() {
    saveGame();
    gameLog.innerHTML += "<p><span style='color: green; font-weight: bold;'>Game saved successfully.</span></p>";
    gameLog.scrollTop = gameLog.scrollHeight;
});

document.getElementById("load-button").addEventListener("click", function() {
    loadGame();
});

document.getElementById("reset-button").addEventListener("click", function() {
    resetGame();
}); 


// Save game state to local storage
function saveGame() {
    localStorage.setItem("level", level);
    localStorage.setItem("experience", experience);
    localStorage.setItem("money", money);
    localStorage.setItem("respect", respect);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("stocks", JSON.stringify(stocks)); // Save the stocks array to localStorage
    localStorage.setItem("health", health); // Save the health value to localStorage
    localStorage.setItem("playerName", playerName); // Save the playerName value to localStorage
}

// Load game state from local storage
function loadGame() {
    level = parseInt(localStorage.getItem("level")) || 1;
    experience = parseInt(localStorage.getItem("experience")) || 0;
    money = parseInt(localStorage.getItem("money")) || 0;
    respect = parseInt(localStorage.getItem("respect")) || 0;
    inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    stocks = JSON.parse(localStorage.getItem("stocks")) || [
        { name: "Dogecoin", price: 100, originalPrice: 100 },
        { name: "Ethereum", price: 500, originalPrice: 500 },
        { name: "Bitcoin", price: 1000, originalPrice: 1000 }
    ];
    health = parseInt(localStorage.getItem("health")) || 100; // Load the health value from localStorage
    playerName = localStorage.getItem("playerName") || "Player Name"; // Load the playerName value from localStorage
    document.getElementById("level").innerHTML = level;
    document.getElementById("experience").innerHTML = experience;
    moneySpan.innerHTML = money;
    respectSpan.innerHTML = respect;
    updateInventoryList();
}

// Reset game state
function resetGame() {
    health = 100;
    level = 1;
    experience = 0;
    money = 0;
    respect = 0;
    inventory = [];
    stocks = [
        { name: "Dogecoin", price: 100, originalPrice: 100 },
        { name: "Ethereum", price: 500, originalPrice: 500 },
        { name: "Bitcoin", price: 1000, originalPrice: 1000 }
    ];
    playerName = "Player Name"; // Reset the playerName value to a default value
    localStorage.removeItem("playerName"); // Remove the playerName value from localStorage
    saveGame();
    loadGame();
    // clear the logs
    gameLog.innerHTML = "";
    // set the welcome message
    let messageElement = document.createElement('p');
    messageElement.innerHTML = "Welcome to The Outlaws!";
    messageElement.style.color = "white";
    messageElement.style.fontWeight = "bold";
    gameLog.appendChild(messageElement);

    // Show the notification to ask the user to enter their name again
    notificationElement.textContent = "Please enter your name:";
    notificationElement.style.display = "block";

    // Create an input element for the user to enter their name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "name-input";
    notificationElement.appendChild(nameInput);

    // Create a button for the user to submit their name
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    notificationElement.appendChild(submitButton);

    // Add an event listener to the submit button
    submitButton.addEventListener("click", () => {
        // Get the value entered by the user
        const nameValue = nameInput.value;

        // Check if the value is between 4 and 12 characters long
        if (nameValue.length < 4 || nameValue.length > 12) {
            gameLog.innerHTML = "<span style='color: cyan; font-weight: bold;'>Name must be between 4 and 12 characters long.</span>";
            gameLog.scrollTop = gameLog.scrollHeight;
            return;
        }

        // Check if the value contains only letters and numbers
        if (!/^[a-zA-Z0-9]+$/.test(nameValue)) {
            gameLog.innerHTML = "<span style='color: cyan; font-weight: bold;'>Name must contain only letters and numbers.</span>";
            gameLog.scrollTop = gameLog.scrollHeight;
            return;
        }

        // If the value passes validation, save it as the player name
        playerName = nameValue;

        // Save the player name to local storage
        localStorage.setItem("playerName", playerName);

        // Update the player name element
        playerNameElement.textContent = playerName;

        // Hide the notification
        notificationElement.style.display = "none";
    });
}
