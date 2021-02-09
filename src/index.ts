// Node modules.
import _ from 'lodash';
import { findBestMatch } from 'string-similarity';

const pokemonList: PokemonName[] = require('../data/pokemon-list.json');
const formList: PokemonForm[] = require('../data/form-list.json');
const regionList: Region[] = require('../data/region-list.json');
const typeList: Type[] = require('../data/type-list.json');

type Locale = 'en-US' | 'zh-TW';

interface Pokemon {
  no: number;
  name: string;
  form: string;
}

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

const getPokemonByFuzzyName = (pokemonName: string, targetLocale: Locale = 'zh-TW'): Pokemon => {
  const { bestMatchIndex } = findBestMatch(pokemonName, pokemonList.map((pokemon) => pokemon['en-US']));

  const matchedPokemon = pokemonList[bestMatchIndex];

  let form = "";
  regionList.forEach((region) => {
    region.patterns.forEach((pattern) => {
      if (new RegExp(pattern, 'i').test(pokemonName)) {
        form = region[targetLocale];
      }
    });
  });

  const pokemon: Pokemon = {
    no: matchedPokemon.no,
    name: matchedPokemon[targetLocale],
    form: form,
  };

  return pokemon;
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

const transType = (typeText: string, targetLocale: Locale = 'zh-TW') => {
  const targetType = typeText.toLowerCase();
  const foundType = typeList.find((type) => type.patterns.includes(targetType));
  return foundType ? foundType[targetLocale] : null;
};

export {
  getPokemonNameByNo,
  getPokemonByFuzzyName,
  transPokemonName,
  transType,
};
