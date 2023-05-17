const items = [
  {
    id: 1,
    name: 'Potion',
    type: 'potion',
    level: 1,
    status: 'heal',
    value: 10,
    description: 'This is a health potion that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal'
      }
    ],
    sprite: './img/hpotion.png',
    rarity: 'common' // lowercase rarity value
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
        value: 5
      }
    ],
    sprite: './img/Attack.png',
    rarity: 'uncommon' // lowercase rarity value
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
        value: 5
      }
    ],
    sprite: './img/shield.png',
    rarity: 'rare' // lowercase rarity value
  },
  {
    id: 4,
    name: 'Apple',
    type: 'food',
    level: 1,
    status: 'heal',
    value: 10,
    description: 'This is an Apple that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal'
      }
    ],
    sprite: './img/apple.png',
    rarity: 'celestial' // lowercase rarity value
  },
  {
    id: 5,
    name: 'Banana',
    type: 'food',
    level: 1,
    status: 'heal',
    value: 10,
    description: 'This is an Banana that restores 10 HP.',
    attributes: [
      {
        name: 'Status',
        value: 'Heal'
      }
    ],
    sprite: './img/banana.png',
    rarity: 'legendary' // lowercase rarity value
  }
];

export default items;
