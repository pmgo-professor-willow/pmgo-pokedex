// Local modules.
import { PokemonRaw } from 'src/models/pokemon';
import { getResources } from 'src/gameMaster';

const pokemonFormDict = await getResources('pokemonForm');
/**
 * `form_normal` and `form_castform_normal` are normal forms of castform.
 * But `form_normal` will obstruct the translation of other pokemons.
 */
pokemonFormDict['normal'] = '<NORMAL>';

const translateForm = (pokemon: PokemonRaw) => {
  /**
   * Partial pokemon's forms are number instead of string.
   * 
   * e.g.
   * * **PIKACHU**: `3011` -> `'3011'`
   */
  const formRaw = pokemon.form ? String(pokemon.form) : null;

  /**
   * If `pokemon.form` is `undefined`, it means this pokemon has no form.
   */
  if (!formRaw) {
    return null;
  }

  /**
   * Form pattern 1: Regional variant.
   * 
   * * `'xxx_ALOLA'` -> `'alola'`
   * * `'xxx_GALARIAN'` -> `'galarian'`
   */
  const pattern1 = formRaw.replace(`${pokemon.pokemonId}_`, '').toLowerCase();
  /**
   * Form pattern 2: Special forms.
   * 
   * * `'GIRATINA_ORIGIN'` -> `'giratina_origin'`
   */
  const pattern2 = formRaw.toLowerCase();

  const form = pokemonFormDict[pattern1] ?? pokemonFormDict[pattern2] ?? formRaw;
  const isNormalForm = form === '<NORMAL>';

  return !isNormalForm ? form : null;
};

export {
  translateForm,
};
