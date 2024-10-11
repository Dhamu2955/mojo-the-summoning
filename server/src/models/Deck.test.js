const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Deck = require('./Deck');
const { db } = require('../db/config');

// Define in global scope
let deck;

// Clear db and create new deck before tests
beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: 'Pinky', xp: 10 }); // Add initial values for testing
});

// Clear db after tests
afterAll(async () => await db.close());

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id');
  });

  it('has a name', async () => {
    expect(deck.name).toBe('Pinky');
  });

  it('has xp', async () => {
    expect(deck.xp).toBe(10);
  });

  it('requires a name', async () => {
    try {
      await Deck.create({ xp: 50 }); // Attempt to create a deck without a name
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('requires xp to be a number', async () => {
    try {
      await Deck.create({ name: 'Knights', xp: 'hello' }); // Attempt to create a deck with a non-numeric xp
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
