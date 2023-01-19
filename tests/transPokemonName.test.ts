// Local modules.
import { Pokedex } from '../src/pokedex';

describe('Multiple forms', () => {
  test.each([
    'Lycanroc Midday',
    'Lycanroc Midday Form',
    'Lycanroc Midnight',
    'Lycanroc Midnight Form',
    'Lycanroc Dusk',
    'Lycanroc Dusk Form',
  ])('Lycanroc (case: "%s")', (fuzzyName) => {
    const pokedex = new Pokedex();
    const actual = pokedex.transPokemonName(fuzzyName);
    expect(actual).toMatchSnapshot();
  });
});

describe('Multiple region forms', () => {
  test.each([
    'Meowth',
    'Alolan Meowth',
    'Alolan Form Meowth',
    'Meowth Alolan',
    'Meowth Alolan Form',
    'Galarian Meowth',
    'Galarian Form Meowth',
    'Meowt Galarian',
    'Meowt Galarian Form',
  ])('Meowth (case: "%s")', (fuzzyName) => {
    const pokedex = new Pokedex();
    const actual = pokedex.transPokemonName(fuzzyName);
    expect(actual).toMatchSnapshot();
  });
});


describe('Multiple region forms with different modes', () => {
  test.each([
    'Darmanitan',
    'Darmanitan Standard Mode',
    'Darmanitan Zen Mode',
    'Darmanitan Galarian Standard Mode',
    'Darmanitan Galarian Zen Mode',
  ])('Darmanitan (case: "%s")', (fuzzyName) => {
    const pokedex = new Pokedex();
    const actual = pokedex.transPokemonName(fuzzyName);
    expect(actual).toMatchSnapshot();
  });
});

describe('Mega evolutions', () => {
  test.each([
    'Mewtwo',
    'Mega Mewtwo X',
    'Mega Mewtwo Y',
  ])('Mewtwo (case: "%s")', (fuzzyName) => {
    const pokedex = new Pokedex();
    const actual = pokedex.transPokemonName(fuzzyName);
    expect(actual).toMatchSnapshot();
  });
});
