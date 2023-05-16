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
    rarity: 'Common' // add rarity property
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
      },
    ],
    sprite: './img/Attack.png',
    rarity: 'Uncommon' // add rarity property
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
    rarity: 'Rare' // add rarity property
  }
];

export default items;
