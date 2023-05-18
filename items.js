const items = [
  {
    id: 1,
    name: 'Potion',
    type: 'potion',
    level: 1,
    status: {
      name: 'Heal',
      value: '10 hp',
    },
    description: 'This is a health potion that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal',
      },
    ],
    sprite: './img/lifepotion.png',
    rarity: 'common', // lowercase rarity value
  },
  {
    id: 2,
    name: 'Sword',
    type: 'weapon',
    level: 1,
    attack: 5,
    description: 'This is a basic sword.',
    attributes: [
      {
        name: 'Attack',
        value: 5,
      },
    ],
    sprite: './img/sword1.png',
    rarity: 'uncommon', // lowercase rarity value
  },
  {
    id: 3,
    name: 'Shield',
    type: 'armor',
    level: 1,
    defense: 5,
    description: 'This is a basic shield.',
    attributes: [
      {
        name: 'Defense',
        value: 5,
      },
    ],
    sprite: './img/shield1.png',
    rarity: 'rare', // lowercase rarity value
  },
  {
    id: 4,
    name: 'Apple',
    type: 'food',
    level: 1,
    status: {
      name: 'Heal',
      value: '5 hp',
    },
    description: 'This is an Apple that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal',
      },
    ],
    sprite: './img/apple.png',
    rarity: 'celestial', // lowercase rarity value
  },
  {
    id: 5,
    name: 'Banana',
    type: 'food',
    level: 1,
    status: {
      name: 'Heal',
      value: '10 hp',
    },
    description: 'This is a Banana that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal',
      },
    ],
    sprite: './img/banana.png',
    rarity: 'legendary', // lowercase rarity value
  },
];

export default items;
