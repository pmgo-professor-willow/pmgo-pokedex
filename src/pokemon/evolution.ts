// Local modules.
import { PokemonRaw } from 'src/models/pokemon';

const formatEvolutions = (pokemon: PokemonRaw) => {
  const evolutions = (pokemon.evolutionBranch ?? []).map((evolution) => {
    let uniqueId = evolution.evolution;

    if (evolution.temporaryEvolution) {
      const { 1: form } = evolution.temporaryEvolution?.match(/^TEMP_EVOLUTION_(\w+)$/)!;
      uniqueId = `${pokemon.pokemonId}_${form}`;
    }

    return {
      uniqueId,
      candyCost: evolution.candyCost,
      energyCost: evolution.temporaryEvolutionEnergyCost,
      item: evolution.evolutionItemRequirement,
      gender: evolution.genderRequirement,
    };
  });

  return evolutions;
};

export {
  formatEvolutions,
};
