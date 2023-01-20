// Node modules.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import _ from 'lodash';
import { findBestMatch } from 'string-similarity';
// Local modules.
import { Pokemon, PokemonForm, PokemonName, Region, Type } from './models/pokemon';

type Locale = 'en-US' | 'zh-TW';

const readJson = (filename: string) => {
  const filepath = join(dirname(require.main?.filename!), '../data', filename);
  const json = JSON.parse(readFileSync(filepath, { encoding: 'utf-8' }))
  return json;
}

class Pokedex {
  private defaultTargetLocale: Locale;
  private pokemonNameList: PokemonName[];
  private pokemonList: Pokemon[];
  private formList: PokemonForm[];
  private regionList: Region[];
  private typeList: Type[];

  constructor(targetLocale: Locale = 'zh-TW') {
    this.defaultTargetLocale = targetLocale;
    this.pokemonNameList = readJson('pokemon-name-list.json');
    this.pokemonList = readJson('pokemon-list.json');
    this.formList = readJson('form-list.json');
    this.regionList = readJson('region-list.json');
    this.typeList = readJson('type-list.json');
  }

  /** Get pokemon's name by pokemon's number. */
  getPokemonNameByNo(pokemonNo: number, locale = this.defaultTargetLocale) {
    const foundPokemon = this.pokemonNameList.find((pokemon) => pokemon.no === pokemonNo);
    return foundPokemon ? foundPokemon[locale] : null;
  };

  /** Get pokemon info object by pokemon's fuzzy name. */
  getPokemonByFuzzyName = (pokemonName: string, targetLocale = this.defaultTargetLocale): Pokemon => {
    const { bestMatchIndex: bestNameIndex } = findBestMatch(pokemonName, this.pokemonNameList.map((pokemonName) => pokemonName['en-US']));
    const { bestMatchIndex: bestIndex } = findBestMatch(pokemonName, this.pokemonList.map((pokemon) => `${pokemon.name}-${pokemon.form}`));

    const matchedPokemonName = this.pokemonNameList[bestNameIndex];
    const matchedPokemon = this.pokemonList[bestIndex];

    let predictedForm: string | null = null;

    // Regional.
    this.regionList.forEach((region) => {
      region.patterns.forEach((pattern) => {
        if (new RegExp(pattern, 'i').test(pokemonName)) {
          predictedForm = region[targetLocale];
        }
      });
    });

    // Forms.
    const formCandidates = this.formList.filter((form) => {
      const isSameName = form.name === matchedPokemon.name;
      const isMatchedForm = new RegExp(_.escapeRegExp(form['en-US']), 'i').test(String(matchedPokemon.form)) || new RegExp(_.escapeRegExp(String(matchedPokemon.form)), 'i').test(String(form['en-US']));
      return isSameName && isMatchedForm;
    });
    if (formCandidates.length > 0) {
      const formText = pokemonName.replace(String(_.first(formCandidates)?.name), '');
      const { bestMatchIndex: bestFormIndex } = findBestMatch(formText, formCandidates.map((form) => String(form[targetLocale])));
      predictedForm = String(formCandidates[bestFormIndex][targetLocale]);
    }

    // Mega evolutions.
    if (/mega\s/i.test(pokemonName)) {
      predictedForm = pokemonName.replace(matchedPokemonName['en-US'], matchedPokemonName[targetLocale]);
    }
  
    const pokemon: Pokemon = {
      no: matchedPokemonName.no,
      name: matchedPokemonName[targetLocale],
      form: predictedForm,
      types: matchedPokemon.types.map((typeText) => this.transType(typeText, targetLocale)!),
    };
  
    return pokemon;
  }

  /** Translate pokemon's display name by pokemon's fuzzy name. */
  transPokemonName(pokemonName: string, targetLocale = this.defaultTargetLocale) {
    const pokemon = this.getPokemonByFuzzyName(pokemonName, targetLocale);
  
    const translatedName = pokemon.form
      ? `${pokemon.name} (${pokemon.form})`
      : pokemon.name;

    return translatedName;
  }

  /** Translate type by text of pokemon type. */
  transType(typeText: string, targetLocale = this.defaultTargetLocale) {
    const targetType = typeText.toLowerCase();
    const foundType = this.typeList.find((type) => type.patterns.includes(targetType));
    return foundType ? foundType[targetLocale] : null;
  }
}

export { Pokedex };
