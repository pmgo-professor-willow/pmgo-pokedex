// Local modules.
import { Pokedex } from '../src/pokedex';

describe('General case', () => {
  test.each([
    1,
    2,
    3,
  ])('English (no: %s)', (no) => {
    const pokedex = new Pokedex('en-US');
    const actual = pokedex.getPokemonNameByNo(no);
    expect(actual).toMatchSnapshot();
  });

  test.each([
    1,
    2,
    3,
  ])('Chinese (no: %s)', (no) => {
    const pokedex = new Pokedex('zh-TW');
    const actual = pokedex.getPokemonNameByNo(no);
    expect(actual).toMatchSnapshot();
  });
});
