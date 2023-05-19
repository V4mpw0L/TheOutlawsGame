import items from './items.js';

const notification = document.querySelector('#notification');
const inventory = document.querySelector('.inventory');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
let currentPage = 0;
const slotsPerPage = 10;
const maxSlots = 50;
let selectedItem = null;
const spawnItemButton = document.querySelector('#spawn-item');
const inventoryItems = [];

// Load inventory items from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedInventoryItems = localStorage.getItem('inventoryItems');
  if (storedInventoryItems) {
    inventoryItems.push(...JSON.parse(storedInventoryItems));
    updateInventory();
  }
});



spawnItemButton.addEventListener('click', () => {
  const itemId = prompt('Enter the ID of the item you want to spawn:');
  const item = items.find(item => item.id === parseInt(itemId));
  if (item) {
    const quantity = parseInt(prompt('Enter the quantity of the item you want to add to your inventory:'));
    if (isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity.');
      return;
    }
    const inventoryItem = inventoryItems.find(inventoryItem => inventoryItem.id === item.id);
    if (inventoryItem) {
      inventoryItem.count += quantity;
    } else {
      inventoryItems.push({...item, count: quantity});
    }
    updateInventory();
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
  } else {
    alert('Item not found.');
  }
});


function updateInventory() {
  inventory.innerHTML = '';
const slotCountDisplay = document.querySelector('#slot-count');
  slotCountDisplay.textContent = `${inventoryItems.length}/${maxSlots}`;

  for (let i = currentPage * slotsPerPage; i < (currentPage + 1) * slotsPerPage && i < maxSlots; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    const inventoryItem = inventoryItems[i];
    if (inventoryItem) {
      const item = items.find(item => item.id === inventoryItem.id);
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');
      const img = document.createElement('img');
      img.src = inventoryItem.sprite;
      img.alt = inventoryItem.name;
      const rarityBorder = document.createElement('div');
      rarityBorder.classList.add(`rarity-border-${inventoryItem.rarity.toLowerCase()}`);
      imgContainer.appendChild(img);
      imgContainer.appendChild(rarityBorder);
      slot.appendChild(imgContainer);


      const span = document.createElement('span');
      span.textContent = inventoryItem.count;
      slot.appendChild(span);
      slot.dataset.id = inventoryItem.id; // add data-id attribute to the slot
      slot.addEventListener('click', event => {
        const itemId = event.currentTarget.dataset.id;
        const item = items.find(item => item.id === parseInt(itemId));
        const notification = document.querySelector('#notification');
        if (selectedItem === inventoryItem) {
          // If the same item is clicked again, toggle the notification visibility
          notification.classList.toggle('hidden');
        } else {
          // Close any previously opened notifications
          if (selectedItem !== null) {
            selectedItem.slot.classList.remove('selected');
            selectedItem = null;
            notification.classList.add('hidden');
          }
          // Display the notification for the clicked item
          selectedItem = inventoryItem;
          selectedItem.slot = slot;
          slot.classList.add('selected');

          notification.innerHTML = `
  <div class="item-info">
    <img id="item-image" src="${item.sprite}" alt="${item.name}">
    <p id="item-quantity">Qty: ${inventoryItem.count}</p>
    <h3 id="item-name">${item.name}</h3>
    <p id="item-description">${item.description}</p>
    <ul id="item-attributes">
      ${item.status
        ? `<li>${item.status.name}: ${item.status.value}</li>`
        : item.attributes.map(attribute => `<li>${attribute.name}: ${attribute.value}</li>`).join('')}
    </ul>
    <span id="item-rarity">Rarity:${item.rarity}</span>
  </div>
  <button id="sell-button">Sell</button>
  <button id="equip-button">Equip</button>
  <button id="close-button" class="close-button">X</button>
`;


          const itemImage = notification.querySelector('#item-image');
          itemImage.src = item.sprite;
          itemImage.alt = item.name;
          itemImage.classList.add(`img-${inventoryItem.rarity.toLowerCase()}`);

 // Add this line

          const itemName = notification.querySelector('#item-name');
           itemName.textContent = item.name;
            itemName.classList.add(`rarity-${item.rarity.toLowerCase()}`);
          const itemDescription = notification.querySelector('#item-description');
          const itemAttributes = notification.querySelector('#item-attributes');
          const itemRarity = notification.querySelector('#item-rarity');
           itemRarity.textContent = `${item.rarity.charAt(0).toUpperCase()}${item.rarity.slice(1).toLowerCase()}`;

          itemRarity.classList.add(`rarity-${item.rarity.toLowerCase()}`);

         const sellButton = notification.querySelector('#sell-button');
         const equipButton = notification.querySelector('#equip-button');
         const closeButton = notification.querySelector('#close-button');


         // Set the position of the notification at the center of the screen
         const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
         const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
         const centerX = screenWidth / 2;
         const centerY = screenHeight / 2;

          notification.style.top = `${centerY}px`;
          notification.style.left = `${centerX}px`;
          notification.classList.remove('hidden');


    sellButton.addEventListener('click', () => {
      const quantity = parseInt(prompt('Enter the quantity to sell:'));
      if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity.');
        return;
      }
    
      if (selectedItem.count >= quantity) {
        selectedItem.count -= quantity;
        if (selectedItem.count === 0) {
          // Remove the item from the inventory
          const itemIndex = inventoryItems.findIndex(item => item.id === selectedItem.id);
          inventoryItems.splice(itemIndex, 1);
          selectedItem.slot.classList.remove('selected');
          selectedItem = null;
          document.querySelector('#notification').classList.add('hidden');
        }
    
        updateInventory();
        console.log(`Sold ${quantity} item(s)`);
      } else {
        alert('Insufficient quantity.');
      }
        localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
      });
    
          equipButton.addEventListener('click', () => {
            // handle equip action here
          });

          closeButton.addEventListener('click', () => {
            selectedItem = null;
            notification.classList.add('hidden');
            slot.classList.remove('selected');
          });
        }
      });
    } else {
      slot.textContent = '';
    }
    inventory.appendChild(slot);
  }
}
updateInventory();

previousButton.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateInventory();
  }
  checkButtonStates();
});

nextButton.addEventListener('click', () => {
  if ((currentPage + 1) * slotsPerPage < maxSlots) {
    currentPage++;
    updateInventory();
  }
  checkButtonStates();
});



function checkButtonStates() {
  if (currentPage === 0) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }

  if ((currentPage + 1) * slotsPerPage >= maxSlots) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}


// Add an event listener to the clean up button
    document.getElementById('cleanButton').addEventListener('click', function() {
      // Clear the inventoryItems array
      inventoryItems.length = 0;

      // Clear the inventory display
      updateInventory();

      // Remove stored inventory items from localStorage
      localStorage.removeItem('inventoryItems');
    });