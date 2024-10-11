const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Card = require('./Card');
const { db } = require('../db/config');

// Define in global scope
let card;

// Clear db and create new card before tests
beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: 'Boop',
    mojo: 50,
    stamina: 30,
    imgUrl: 'http://google.com/boopy'
  });
});

// Clear db after tests
afterAll(async () => await db.close());

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id');
  });

  it('has a name', async () => {
    expect(card.name).toBe('Boop');
  });

  it('has mojo', async () => {
    expect(card.mojo).toBe(50);
  });

  it('has stamina', async () => {
    expect(card.stamina).toBe(30);
  });

  it('has an imgUrl', async () => {
    expect(card.imgUrl).toBe('http://google.com/boopy');
  });

  it('requires a name', async () => {
    try {
      await Card.create({
        mojo: 50,
        stamina: 30,
        imgUrl: 'http://google.com/boopy.png'
      }); // Attempt to create a card without a name
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('requires mojo to be a number', async () => {
    try {
      await Card.create({
        name: 'Beep',
        mojo: 'notANumber',
        stamina: 30,
        imgUrl: 'http://example.com/ice_spike'
      }); // Attempt to create a card with a non-numeric mojo
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('requires stamina to be a number', async () => {
    try {
      await Card.create({
        name: 'Bong',
        mojo: 40,
        stamina: 'notANumber',
        imgUrl: 'http://google.com/Bang'
      }); // Attempt to create a card with a non-numeric stamina
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
