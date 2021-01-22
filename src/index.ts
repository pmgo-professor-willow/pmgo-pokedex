// Node modules.
import _ from 'lodash';
// Local modules.
import pokemonList from '../data/pokemon-list.json';
import formList from '../data/form-list.json';

type Locale = 'en-US' | 'zh-TW';

const getPokemonByNo = (pokemonNo: number) => {
  return pokemonList.find((pokemon) => pokemon.no === pokemonNo);
};

const getFormsByNo = (pokemonNo: number) => {
  return formList.filter((pokemon) => pokemon.no === pokemonNo);
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
  }

  return translatedName;
};

export {
  transPokemonName,
};
