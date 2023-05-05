var level = parseInt(localStorage.getItem("level")) || 1;
var experience = parseInt(localStorage.getItem("experience")) || 0;
var money = parseInt(localStorage.getItem("money")) || 0;
var respect = parseInt(localStorage.getItem("respect")) || 0;
var moneyWithCommas = money.toLocaleString("en-US");
var respectWithCommas = respect.toLocaleString("en-US");
var inventory = JSON.parse(localStorage.getItem("inventory")) || [];
var moneySpan = document.getElementById("money");
var respectSpan = document.getElementById("respect");
var gameLog = document.getElementById("game-log");
var inventoryList = document.getElementById("inventory-list");
var stocks = JSON.parse(localStorage.getItem("stocks")) || [
    { name: "Dogecoin", price: 100, originalPrice: 100 },
    { name: "Ethereum", price: 500, originalPrice: 500 },
    { name: "Bitcoin", price: 1000, originalPrice: 1000 }
];


updateInventoryList();
updateStockPricesList();

document.getElementById("level").innerHTML = level;
document.getElementById("experience").innerHTML = experience;
document.getElementById("money").innerHTML = moneyWithCommas;
document.getElementById("respect").innerHTML = respectWithCommas;



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
document.getElementById("rob-button").addEventListener("click", function() {
    if (canClickRob) {
        canClickRob = false;
        let timeLeft = Math.floor(Math.random() * (3000 - 1000) + 1000);
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
            }
        }, intervalTime);
                
        var successChance = Math.random() - (respect * 0.0001); // subtract respect divided by 10 from the success chance
        if (successChance < 0.5) {
            var moneyGained = Math.floor(Math.random() * 85);
            money += moneyGained;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;

            // Increment experience by a random amount
            var experienceGained = Math.floor(Math.random() * 10) + 1;
            experience += experienceGained;

            // Update game log
            gameLog.innerHTML += "<p>You successfully robbed a store and gained $" + moneyGained + " and " + experienceGained + " experience.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;

            // Check if player has leveled up
            if (experience >= 100) {
                level += 1;
                experience = 0;

                // Update game log
                var newLogEntry = document.createElement("li");
                newLogEntry.textContent = "You leveled up! You are now level " + level + ".";
                gameLog.appendChild(newLogEntry);
            }

            // Update HTML elements
            document.getElementById("level").innerHTML = level;
            document.getElementById("experience").innerHTML = experience;
        } else {
            var moneyLost = Math.floor(Math.random() * 50);
            if (moneyLost <= money) {
                money -= moneyLost;
                gameLog.innerHTML += "<p>You failed to rob a store and lost $" + moneyLost + ". You didn't gain any experience.</p>";
            } else {
                money = 0;
                gameLog.innerHTML += "<p>You failed to rob a store and lost all your remaining money. You didn't gain any experience.</p>";
            }
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.scrollTop = gameLog.scrollHeight;
        }
        saveGame();
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
        gameLog.innerHTML += "<p>You sold " + drugsToSell + " drugs and gained $" + moneyGained + ".</p>";
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
            gameLog.innerHTML += "<p>You bought " + drugsToBuy + " drugs and lost $" + moneyLost + ".</p>";
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
        let timeLeft = Math.floor(Math.random() * (4000 - 1000) + 1000);
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
            }
        }, intervalTime);

        var respectGained = Math.floor(Math.random() * 10);
        respect += respectGained;
        respectWithCommas = respect.toLocaleString("en-US");
        respectSpan.innerHTML = respectWithCommas;
        gameLog.innerHTML += "<p>You went to the gym and gained " + respectGained + " respect.</p>";
        gameLog.scrollTop = gameLog.scrollHeight;
        saveGame();
    }
});


document.getElementById("gamble-button").addEventListener("click", function() {
    this.disabled = true;
    setTimeout(() => {
        this.disabled = false;
    }, Math.random() * (5000 - 1000) + 1000);
    var betAmount = parseInt(prompt("How much money would you like to bet?", "0"));
    if (betAmount > 0 && betAmount <= money) {
        var winChance = Math.random();
        if (winChance < 0.5) {
            var moneyGained = betAmount * 2;
            money += moneyGained;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You won $" + moneyGained + " from gambling.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        } else {
            money -= betAmount;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You lost $" + betAmount + " from gambling.</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
        }
        saveGame();
    } else {
        alert("Invalid bet amount.");
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
            gameLog.innerHTML += "<p>You bought " + quantity + " shares of " + stockName + " for $" + cost + ".</p>";
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
        alert("Invalid stock name.");
    }
}


function sellStock(stockName, quantity) {
    var stockInInventory = inventory.find(function(item) {
        return item.name === stockName;
    });
    if (stockInInventory && stockInInventory.quantity >= quantity) {
        var stock = stocks.find(function(stock) {
            return stock.name === stockName;
        });
        if (stock) {
            var revenue = stock.price * quantity;
            money += revenue;
            moneyWithCommas = money.toLocaleString("en-US");
            moneySpan.innerHTML = moneyWithCommas;
            gameLog.innerHTML += "<p>You sold " + quantity + " shares of " + stockName + " for $" + revenue + ".</p>";
            gameLog.scrollTop = gameLog.scrollHeight;
            stockInInventory.quantity -= quantity;
            if (stockInInventory.quantity === 0) {
                inventory.splice(inventory.indexOf(stockInInventory), 1);
            }
            updateInventoryList();
            saveGame();
        } else {
            alert("Invalid stock name.");
        }
    } else {
        alert("You don't have that many shares to sell.");
    }
}


document.getElementById("buy-stock-button").addEventListener("click", function() {
    var stockName = prompt("Which stock would you like to buy?", "");
    var quantity = parseInt(prompt("How many shares would you like to buy?", "0"));
    if (quantity > 0) {
        buyStock(stockName, quantity);
    } else {
        alert("Invalid quantity.");
    }
});

document.getElementById("sell-stock-button").addEventListener("click", function() {
    var stockName = prompt("Which stock would you like to sell?", "");
    var quantity = parseInt(prompt("How many shares would you like to sell?", "0"));
    if (quantity > 0) {
        sellStock(stockName, quantity);
    } else {
        alert("Invalid quantity.");
    }
});


function updateStockPricesList() {
    var stockPricesList = document.getElementById("stock-prices-list");
    stockPricesList.innerHTML = "";
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];
        var stockPriceItem = document.createElement("li");
        stockPriceItem.textContent = stock.name + ": $" + stock.price;
        stockPricesList.appendChild(stockPriceItem);
    }
}
setInterval(updateStockPricesList, 1000);
setInterval(updateStockPrices, 5000);


function updateInventoryList() {
    // Clear the current contents of the inventory list
    inventoryList.innerHTML = '';
    
    // Group the inventory items by name and sum their quantities
    var groupedInventory = {};
    for (var i=0; i<inventory.length; i++) {
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


document.getElementById("toggle-buttons").addEventListener("click", function() {
    var buttonsContainer = document.getElementById("save-load-reset-menu");
    buttonsContainer.classList.toggle("buttons-hidden");
});

document.getElementById("save-button").addEventListener("click", function() {
    saveGame();
});

document.getElementById("load-button").addEventListener("click", function() {
    loadGame();
});

document.getElementById("reset-button").addEventListener("click", function() {
    resetGame();
}); 


// Save game state to local storage
function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("respect", respect);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    localStorage.setItem("stocks", JSON.stringify(stocks)); // Save the stocks array to localStorage
}


// Load game state from local storage
function loadGame() {
    money = parseInt(localStorage.getItem("money")) || 0;
    respect = parseInt(localStorage.getItem("respect")) || 0;
    inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    stocks = JSON.parse(localStorage.getItem("stocks")) || [ // Load the stocks array from localStorage
        { name: "Dogecoin", price: 100, originalPrice: 100 },
        { name: "Ethereum", price: 500, originalPrice: 500 },
        { name: "Bitcoin", price: 1000, originalPrice: 1000 }
    ];
    moneySpan.innerHTML = money;
    respectSpan.innerHTML = respect;
    updateInventoryList();
}


// Reset game state
function resetGame() {
    money = 0;
    respect = 0;
    inventory = [];
    stocks = [ // Reset the stocks array to its original values
        { name: "Dogecoin", price: 100, originalPrice: 100 },
        { name: "Ethereum", price: 500, originalPrice: 500 },
        { name: "Bitcoin", price: 1000, originalPrice: 1000 }
    ];
    saveGame();
    loadGame();
}

