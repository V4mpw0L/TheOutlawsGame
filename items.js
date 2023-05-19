const items = [
  {
    id: 1,
    name: 'Potion',
    type: 'potion',
    level: 1,
    status: {
      name: 'Heal',
      value: '10',
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
      value: '5',
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
      value: '10',
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
  
  {
    id: 6,
    name: 'Great Sword of the Gods',
    type: 'weapon',
    level: 1,
    status: {
      name: 'Attack',
      value: '15 hp',
    },
    description: 'This is a Great Sword of the Gods!.',
    attributes: [
      {
        name: 'Attack',
        value: '15',
      },
    ],
    sprite: './img/sword.png',
    rarity: 'celestial', // lowercase rarity value
  },
  
{
  id: 7,
  name: 'Ring of Fire',
  type: 'accessory',
  level: 3,
  attributes: [
    {
      name: 'Fire Resistance',
      value: 10,
    },
    {
      name: 'Strength',
      value: 5,
    },
  ],
  description: 'A ring that grants resistance to fire and enhances strength.',
  sprite: './img/ring.png',
  rarity: 'rare', // lowercase rarity value
},


{
  id: 8,
  name: 'Robe of the Archmage',
  type: 'armor',
  level: 5,
  defense: 15,
  attributes: [
    {
      name: 'Intelligence',
      value: 10,
    },
    {
      name: 'Magic Resistance',
      value: 8,
    },
  ],
  description: 'A powerful robe worn by legendary archmages, providing exceptional defense and magical attributes.',
  sprite: './img/robe.png',
  rarity: 'legendary', // lowercase rarity value
}

];

export default items;
