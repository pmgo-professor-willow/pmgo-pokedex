// Node modules.
import { readFileSync } from 'node:fs';
import _ from 'lodash';
import { findBestMatch } from 'string-similarity';
// Local modules.
import { Pokemon, PokemonForm, PokemonName, Region, Type } from './models/pokemon';

const pokemonNameList: PokemonName[] = JSON.parse(readFileSync('data/pokemon-name-list.json', { encoding: 'utf-8' }));
const pokemonList: Pokemon[] = JSON.parse(readFileSync('data/pokemon-list.json', { encoding: 'utf-8' }));
const formList: PokemonForm[] = JSON.parse(readFileSync('data/form-list.json', { encoding: 'utf-8' }));
const regionList: Region[] = JSON.parse(readFileSync('data/region-list.json', { encoding: 'utf-8' }));
const typeList: Type[] = JSON.parse(readFileSync('data/type-list.json', { encoding: 'utf-8' }));

type Locale = 'en-US' | 'zh-TW';

const getPokemonByNo = (pokemonNo: number) => {
  return pokemonNameList.find((pokemon) => pokemon.no === pokemonNo);
};

const getFormsByNo = (pokemonNo: number) => {
  return formList.filter((pokemon) => pokemon.no === pokemonNo);
};

const getPokemonNameByNo = (pokemonNo: number, locale: Locale = 'zh-TW') => {
  const foundPokemon = pokemonNameList.find((pokemon) => pokemon.no === pokemonNo);
  return foundPokemon ? foundPokemon[locale] : null;
};

const getPokemonByFuzzyName = (pokemonName: string, targetLocale: Locale = 'zh-TW'): Pokemon => {
  const { bestMatchIndex: bestNameIndex } = findBestMatch(pokemonName, pokemonNameList.map((pokemonName) => pokemonName['en-US']));
  const { bestMatchIndex: bestIndex } = findBestMatch(pokemonName, pokemonList.map((pokemon) => `${pokemon.name}-${pokemon.form}`));

  const matchedPokemonName = pokemonNameList[bestNameIndex];
  const matchedPokemon = pokemonList[bestIndex];

  let form = "";
  regionList.forEach((region) => {
    region.patterns.forEach((pattern) => {
      if (new RegExp(pattern, 'i').test(pokemonName)) {
        form = region[targetLocale];
      }
    });
  });

  formList.forEach((f) => {
    if (f.name === matchedPokemon.name && f['en-US'] === matchedPokemon.form) {
      form = f[targetLocale] as string;
    }
  });

  const pokemon: Pokemon = {
    no: matchedPokemonName.no,
    name: matchedPokemonName[targetLocale],
    form: form,
    types: matchedPokemon.types.map((typeText) => transType(typeText, targetLocale)!),
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
    const filteredForms = forms.filter((form) => form.no === pokemonNo);
    if (filteredForms.length > 0) {
      const { bestMatchIndex } = findBestMatch(translatedName, filteredForms.map((form) => form['en-US'] || ''));
      if (bestMatchIndex >= 0) {
        // TODO: make it better.
        const form = filteredForms[bestMatchIndex][targetLocale];
        translatedName = form
          ? `${pokemon[targetLocale]} (${form})`
          : pokemon[targetLocale];
      }
    }

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
