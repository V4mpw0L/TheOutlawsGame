let skills = {
  mining: {
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  },
  fishing: {
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  },
  cooking: {
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  },
  hunting: {
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  },
  woodcutting: {
    level: 1,
    experience: 0,
    experienceToNextLevel: 100
  }
};

const skillColors = {
  mining: 'mining-color',
  fishing: 'fishing-color',
  cooking: 'cooking-color',
  woodcutting: 'woodcutting-color',
  hunting: 'hunting-color'
};


const savedSkills = localStorage.getItem('skills');
if (savedSkills) {
  skills = JSON.parse(savedSkills);
}

function saveState() {
  localStorage.setItem('skills', JSON.stringify(skills));
}


updateSkill('mining');
updateSkill('fishing');
updateSkill('cooking');
updateSkill('woodcutting');
updateSkill('hunting');

function updateSkill(skill) {
  const skillElement = document.querySelector(`#${skill}-container`);
  const levelElement = skillElement.querySelector(`#${skill}-level`);
  const experienceElement = skillElement.querySelector(`#${skill}-experience`);
  const progressBarElement = skillElement.querySelector(`#${skill}-progress-bar`);
  const buttonElement = skillElement.querySelector(`#${skill}-button`);
  levelElement.textContent = skills[skill].level;
  experienceElement.textContent = skills[skill].experience;
  const progress = skills[skill].experience / skills[skill].experienceToNextLevel;
  progressBarElement.style.width = `${progress * 100}%`;
  if (buttonElement.disabled) {
    buttonElement.style.backgroundColor = 'grey';
  } else {
    buttonElement.style.backgroundColor = '';
  }
}

let isButtonClicked = false;
function gainExperience(skill) {
  if (isButtonClicked) {
    return;
  }
  isButtonClicked = true;
  const skillElement = document.querySelector(`#${skill}-container`);
  const buttonElement = skillElement.querySelector(`#${skill}-button`);
  const timerBarElement = skillElement.querySelector(`#${skill}-timer-bar`);
  const skillButtons = document.querySelectorAll('.skill-container button');
  skillButtons.forEach((button) => {
    if (button.id !== `${skill}-button`) {
      button.disabled = true;
      button.style.backgroundColor = 'grey';
    }
  });

  buttonElement.disabled = true;
  buttonElement.style.backgroundColor = 'grey';

  let timeRemaining = Math.floor(Math.random() * (6000 - 1000 + 1)) + 1000;
  const totalTime = timeRemaining;

  const timer = setInterval(() => {
    timeRemaining -= 100;
    timerBarElement.style.width = `${(timeRemaining / totalTime) * 100}%`;

    // Calculate remaining seconds
    const remainingSeconds = Math.ceil(timeRemaining / 1000);
timerBarElement.innerHTML = `<span class="timer-bar__text">${remainingSeconds}s</span>`;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      buttonElement.disabled = false;
      buttonElement.style.backgroundColor = '';

      skillButtons.forEach((button) => {
        if (button.id !== `${skill}-button`) {
          button.disabled = false;
          button.style.backgroundColor = '';
        }
      });
      isButtonClicked = false;
      saveState();
    }
  }, 100);

  const previousLevel = skills[skill].level;
  const previousExperience = skills[skill].experience;
  skills[skill].experience += Math.floor(Math.random() * 10) + 1;

  if (skills[skill].experience >= skills[skill].experienceToNextLevel) {
    skills[skill].level++;
    skills[skill].experience -= skills[skill].experienceToNextLevel;
    skills[skill].experienceToNextLevel *= 2;
  }

  updateSkill(skill);

  if (skills[skill].level > previousLevel) {
    createNotification(`Congratulations! Your <span class="${skillColors[skill]}">${skill}</span> skill has leveled up to level <span class="${skillColors[skill]}">${skills[skill].level}</span>!`);
  } else {
    createNotification(`You have gained ${skills[skill].experience - previousExperience} experience in <span class="${skillColors[skill]}">${skill}</span>!`);
  }
}


function createNotification(text) {
  const notificationElement = document.createElement('div');
  notificationElement.classList.add('notification');
  notificationElement.innerHTML = text; // use innerHTML instead of textContent to parse HTML tags

  notificationElement.addEventListener('click', () => {
    notificationElement.remove();
  });

  document.body.appendChild(notificationElement);

  // Remove the notification after a timeout
  setTimeout(() => {
    notificationElement.remove();
  }, 4000); // remove notification after 4 seconds
}



document.querySelector('#mining-button').addEventListener('click', () => gainExperience('mining'));
document.querySelector('#fishing-button').addEventListener('click', () => gainExperience('fishing'));
document.querySelector('#cooking-button').addEventListener('click', () => gainExperience('cooking'));
document.querySelector('#woodcutting-button').addEventListener('click', () => gainExperience('woodcutting'));
document.querySelector('#hunting-button').addEventListener('click', () => gainExperience('hunting'));


// Adicione um evento de clique ao botão de salvar
document.querySelector('#save-button').addEventListener('click', () => {
  // Salvar os dados aqui
  saveState();
});

// Add event listener to reset button
document.querySelector('#reset-button').addEventListener('click', () => {
  // Reset skills to default values
  skills = {
    mining: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100
    },
    fishing: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100
    },
    cooking: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100
    },
    hunting: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100
    },
    woodcutting: {
      level: 1,
      experience: 0,
      experienceToNextLevel: 100
    }
  };

  // Save reset state to local storage
  saveState();

  // Update UI with reset values
  updateSkill('mining');
  updateSkill('fishing');
  updateSkill('cooking');
  updateSkill('woodcutting');
  updateSkill('hunting');
});


