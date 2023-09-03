// Local modules.
import { PokemonRaw, Pokemon } from 'src/models/pokemon';
import { translateName } from 'src/pokemon/name';
import { translateForm } from 'src/pokemon/form';
import { translateType } from 'src/pokemon/type';

const override = (
  pokemon: PokemonRaw,
  pokemonInstance: Pokemon,
  tempEvoOverride: PokemonRaw['tempEvoOverrides'][number],
  uniqueIdPostfix: 'MEGA' | 'MEGA_X' | 'MEGA_Y' | 'PRIMAL',
  nameResourceIdPostfix: '0001' | '0002' | '0003' | '0004',
  form: 'temp_evolution' | 'primal_evolution',
) => {
  const noIndex = pokemonInstance.no.toString().padStart(4, '0');
  const megaPokemonInstance: Pokemon = {
    ...pokemonInstance,
    uniqueId: `${pokemon.pokemonId}_${uniqueIdPostfix}`,
    name: translateName(`${noIndex}_${nameResourceIdPostfix}`),
    types: translateType({ ...pokemon, type: tempEvoOverride.typeOverride1, type2: tempEvoOverride.typeOverride2 }),
    form: translateForm({ ...pokemon, form: form }),
    stats: {
      baseStamina: tempEvoOverride.stats.baseStamina,
      baseAttack: tempEvoOverride.stats.baseAttack,
      baseDefense: tempEvoOverride.stats.baseDefense,
    },
    evolutions: [],
  };

  return megaPokemonInstance;
};

const createTempEvolutionPokemonInstances = (pokemon: PokemonRaw, pokemonInstance: Pokemon) => {
  const isNormalFormPokemon = pokemonInstance.form === null;
  const hasTempEvolution = !!pokemon.tempEvoOverrides;

  if (isNormalFormPokemon && hasTempEvolution) {
    const tempEvolutionPokemonInstances = pokemon.tempEvoOverrides.flatMap((tempEvoOverride) => {
      const isMega = tempEvoOverride.tempEvoId === 'TEMP_EVOLUTION_MEGA';
      const isMegaX = tempEvoOverride.tempEvoId === 'TEMP_EVOLUTION_MEGA_X';
      const isMegaY = tempEvoOverride.tempEvoId === 'TEMP_EVOLUTION_MEGA_Y';
      const isPrimal = tempEvoOverride.tempEvoId === 'TEMP_EVOLUTION_PRIMAL';

      if (isMega) {
        const megaPokemonInstances = override(pokemon, pokemonInstance, tempEvoOverride, 'MEGA', '0001', 'temp_evolution');
        return [megaPokemonInstances];
      }

      if (isMegaX) {
        const megaPokemonInstances = override(pokemon, pokemonInstance, tempEvoOverride, 'MEGA_X', '0002', 'temp_evolution');
        return [megaPokemonInstances];
      }

      if (isMegaY) {
        const megaPokemonInstances = override(pokemon, pokemonInstance, tempEvoOverride, 'MEGA_Y', '0003', 'temp_evolution');
        return [megaPokemonInstances];
      }

      if (isPrimal) {
        const megaPokemonInstances = override(pokemon, pokemonInstance, tempEvoOverride, 'PRIMAL', '0004', 'primal_evolution');
        return [megaPokemonInstances];
      }

      return [];
    });

    return tempEvolutionPokemonInstances;
  }

  return [];
};

export {
  createTempEvolutionPokemonInstances,
};
