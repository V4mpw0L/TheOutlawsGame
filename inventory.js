import items from './items.js';

const inventory = document.querySelector('.inventory');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
let currentPage = 0;
const slotsPerPage = 10;
const maxSlots = 50;
let selectedItem = null;
const spawnItemButton = document.querySelector('#spawn-item');
const inventoryItems = [];

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
  } else {
    alert('Item not found.');
  }
});

function updateInventory() {
  inventory.innerHTML = '';
  for (let i = currentPage * slotsPerPage; i < (currentPage + 1) * slotsPerPage && i < maxSlots; i++) {
    const slot = document.createElement('div');
    slot.classList.add('slot');
    const inventoryItem = inventoryItems[i];
    if (inventoryItem) {
      const img = document.createElement('img');
      img.src = inventoryItem.sprite;
      img.alt = inventoryItem.name;
      slot.appendChild(img);
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
              <h3 id="item-name">${item.name}</h3>
              <p id="item-description">${item.description}</p>
              <ul id="item-attributes">
                ${item.attributes.map(attribute => `<li>${attribute.name}: ${attribute.value}</li>`).join('')}
              </ul>
              <span id="item-rarity">Rarity: ${item.rarity}</span>
            </div>
            <button id="sell-button">Sell</button>
            <button id="equip-button">Equip</button>
            <button id="close-button" class="close-button">X</button>
          `;
          const itemImage = notification.querySelector('#item-image');
const itemName = notification.querySelector('#item-name');
itemName.textContent = item.name;
itemName.classList.add(`rarity-${item.rarity.toLowerCase()}`);

const itemDescription = notification.querySelector('#item-description');
const itemAttributes = notification.querySelector('#item-attributes');
const itemRarity = notification.querySelector('#item-rarity');
itemRarity.textContent = item.rarity;
itemRarity.classList.add(`rarity-${item.rarity.toLowerCase()}`);


const sellButton = notification.querySelector('#sell-button');
const equipButton = notification.querySelector('#equip-button');
const closeButton = notification.querySelector('#close-button');


          // Set the position of the notification relative to the clicked item
          const rect = event.target.getBoundingClientRect();
          const offsetX = rect.width / 2;
          const offsetY = -notification.offsetHeight;
          const x = rect.left + offsetX;
          const y = rect.top + offsetY;

          notification.style.top = `${y}px`;
          notification.style.left = `${x}px`;
          notification.classList.remove('hidden');

          sellButton.addEventListener('click', () => {
            // handle sell action here
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

