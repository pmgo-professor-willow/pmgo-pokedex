// Node modules.
import _ from 'lodash';

const pokemonList: PokemonName[] = require('../data/pokemon-list.json');
const formList: PokemonForm[] = require('../data/form-list.json');
const regionList: Region[] = require('../data/region-list.json');

type Locale = 'en-US' | 'zh-TW';

const getPokemonByNo = (pokemonNo: number) => {
  return pokemonList.find((pokemon) => pokemon.no === pokemonNo);
};

const getFormsByNo = (pokemonNo: number) => {
  return formList.filter((pokemon) => pokemon.no === pokemonNo);
};

const getPokemonNameByNo = (pokemonNo: number, locale: Locale = 'zh-TW') => {
  const foundPokemon = pokemonList.find((pokemon) => pokemon.no === pokemonNo);
  return foundPokemon ? foundPokemon[locale] : null;
};

const transPokemonName = (pokemonName: string, pokemonNo: number, targetLocale: Locale = 'zh-TW') => {
  const baseLocale: Locale = 'en-US';
  const pokemon = getPokemonByNo(pokemonNo);
  const forms = getFormsByNo(pokemonNo);

  let translatedName = pokemonName;

  if (pokemon) {
    // Replace base name.
    translatedName = translatedName.replace(
      new RegExp(pokemon[baseLocale], 'i'),
      pokemon[targetLocale],
    );
    // Replace form type.
    forms.forEach((form) => {
      if (form[baseLocale] && form[targetLocale]) {
        translatedName = translatedName.replace(
          new RegExp(form[baseLocale]!, 'i'),
          form[targetLocale]!,
        );
      }
    });
    // Replace regional.
    regionList.forEach((region) => {
      region.patterns.forEach((pattern) => {
        translatedName = translatedName.replace(
          new RegExp(pattern, 'i'),
          region[targetLocale],
        );
      });
    });
  }

  return translatedName;
};

export {
  getPokemonNameByNo,
  transPokemonName,
};
