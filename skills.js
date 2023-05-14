let miningLevel = 1;
let miningXP = 0;

let fishingLevel = 1;
let fishingXP = 0;

let woodcuttingLevel = 1;
let woodcuttingXP = 0;

let cookingLevel = 1;
let cookingXP = 0;

let skills = [];

// Define the function to get the player's skills
function getPlayerSkills() {
    return skills;
  }

// Load player data from local storage
let playerData = JSON.parse(localStorage.getItem('playerData')) || {};

// Set initial values or use saved values
miningLevel = playerData.miningLevel || miningLevel;
miningXP = playerData.miningXP || miningXP;
fishingLevel = playerData.fishingLevel || fishingLevel;
fishingXP = playerData.fishingXP || fishingXP;
cookingLevel = playerData.cookingLevel || cookingLevel;
cookingXP = playerData.cookingXP || cookingXP;
woodcuttingLevel = playerData.woodcuttingLevel || woodcuttingLevel;
woodcuttingXP = playerData.woodcuttingXP || woodcuttingXP;
skills = playerData.skills || skills;

// Define the function to get the player's skills
function getPlayerSkills() {
  return skills;
}

// Call the function to get the player's skills
skills = getPlayerSkills();

// Loop through the skills and add them to the list
skills.forEach(skill => {
  const listItem = document.createElement('li');
  listItem.textContent = skill;
  document.getElementById('skills-list').appendChild(listItem);
});

// Get fishing and mining button elements
const fishingBtn = document.getElementById('fishing-button');
const miningBtn = document.getElementById('mining-button');
const cookingBtn = document.getElementById('cooking-button');
const woodcuttingBtn = document.getElementById('woodcutting-button');

// Get progress bar elements
const fishingProgressBar = document.getElementById('fishing-progress-bar');
const miningProgressBar = document.getElementById('mining-progress-bar');
const cookingProgressBar = document.getElementById('cooking-progress-bar');
const woodcuttingProgressBar = document.getElementById('woodcutting-progress-bar');

// Add event listeners to buttons
fishingBtn.addEventListener('click', startFishing);
miningBtn.addEventListener('click', startMining);
cookingBtn.addEventListener('click', startCooking);
woodcuttingBtn.addEventListener('click', startWoodcutting);

// Function to handle fishing button click
function startFishing() {
  // TODO: Implement fishing logic
  fishingXP += 10; // increase fishing experience by 10 points
    
  // check if player has enough experience to level up
  if (fishingXP >= fishingLevel * 100) {
    fishingLevel++; // increase fishing level
    fishingXP = 0; // reset fishing experience
    alert("You've leveled up in fishing to level " + fishingLevel + "!");
  }

  // Save player data to local storage
  playerData.fishingLevel = fishingLevel;
  playerData.fishingXP = fishingXP;
  localStorage.setItem('playerData', JSON.stringify(playerData));
  
  startProgressBar(fishingProgressBar);
}

// Function to handle mining button click
function startMining() {
  // TODO: Implement mining logic
  miningXP += 10; // increase mining experience by 10 points
    
  // check if player has enough experience to level up
  if (miningXP >= miningLevel * 100) {
    miningLevel++; // increase mining level
    miningXP = 0; // reset mining experience
    alert("You've leveled up in mining to level " + miningLevel + "!");
  }

  // Save player data to local storage
  playerData.miningLevel = miningLevel;
  playerData.miningXP = miningXP;
  localStorage.setItem('playerData', JSON.stringify(playerData));
  
  startProgressBar(miningProgressBar);
}

// Function to handle mining button click
function startCooking() {
  // TODO: Implement mining logic
  cookingXP += 10; // increase mining experience by 10 points
    
  // check if player has enough experience to level up
  if (cookingXP >= cookingLevel * 100) {
    cookingLevel++; // increase cooking level
    cookingXP = 0; // reset cooking experience
    alert("You've leveled up in cooking to level " + cookingLevel + "!");
  }

  // Save player data to local storage
  playerData.cookingLevel = cookingLevel;
  playerData.cookingXP = cookingXP;
  localStorage.setItem('playerData', JSON.stringify(playerData));
  
  startProgressBar(cookingProgressBar);
}

// Function to handle mining button click
function startWoodcutting() {
  // TODO: Implement mining logic
  woodcuttingXP += 10; // increase mining experience by 10 points
    
  // check if player has enough experience to level up
  if (woodcuttingXP >= woodcuttingLevel * 100) {
    woodcuttingLevel++; // increase woodcutting level
    woodcuttingXP = 0; // reset woodcutting experience
    alert("You've leveled up in woodcutting to level " + woodcuttingLevel + "!");
  }

  // Save player data to local storage
  playerData.woodcuttingLevel = woodcuttingLevel;
  playerData.woodcuttingXP = woodcuttingXP;
  localStorage.setItem('playerData', JSON.stringify(playerData));
  
  startProgressBar(woodcuttingProgressBar);
}

// Function to start progress bar animation
function startProgressBar(progressBar) {
  progressBar.style.width = '0%';
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
    } else {
      width++;
      progressBar.style.width = `${width}%`;
    }
  }, 10);
}
