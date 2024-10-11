const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Attack = require('./Attack');
const { db } = require('../db/config');

// Define in global scope
let attack;

// Clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: 'Booped',
    mojoCost: 1002,
    staminaCost: 409
  }); 
});

// Clear db after tests
afterAll(async () => await db.close());

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id');
  });

  it('has a title', async () => {
    expect(attack.title).toBe('Booped');
  });

  it('has a mojoCost', async () => {
    expect(attack.mojoCost).toBe(1002);
  });

  it('has a staminaCost', async () => {
    expect(attack.staminaCost).toBe(409);
  });

  it('requires a title', async () => {
    try {
      await Attack.create({
        mojoCost: 7,
        staminaCost: 4
      }); 
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('requires mojoCost to be a number', async () => {
    try {
      await Attack.create({
        title: 'Kick',
        mojoCost: 'notANumber',
        staminaCost: 4
      }); // Attempt to create an attack with a non-numeric mojoCost
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('requires staminaCost to be a number', async () => {
    try {
      await Attack.create({
        title: 'Something',
        mojoCost: 5,
        staminaCost: 'notANumber'
      }); // Attempt to create an attack with a non-numeric staminaCost
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
