// Local modules.
import { PokemonRaw, Pokemon } from 'src/models/pokemon';
import { getGameMaster } from 'src/gameMaster';
import { translateName } from 'src/pokemon/name';
import { translateType } from 'src/pokemon/type';
import { translateClass } from 'src/pokemon/class';
import { translateForm } from 'src/pokemon/form';
import { translateCategory } from 'src/pokemon/category';
import { translateDescription } from 'src/pokemon/description';
import { formatEvolutions } from 'src/pokemon/evolution';
import { calculateCP } from 'src/pokemon/cp';
import { createTempEvolutionPokemonInstances } from 'src/pokemon/tempEvolution';
import { getMoveByIds } from 'src/move/index';

const getPokemons = () => {
  const gameMaster = getGameMaster();

  const pokemons = gameMaster.reduce<Pokemon[]>((prev, template) => {
    /**
     * @example input: 'V0001_POKEMON_BULBASAUR'
     */
    const matches = template.templateId.match(/^V(\d+)_POKEMON_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: pokemonNameIndex } = matches;
      const pokemon = template.data.pokemonSettings as PokemonRaw;

      if (pokemon) {
        const pokemonInstance: Pokemon = {
          uniqueId: pokemon.form ? `${pokemon.pokemonId}_${pokemon.form}` : pokemon.pokemonId,
          pokemonId: pokemon.pokemonId,
          no: parseInt(noIndex),
          name: translateName(noIndex),
          types: translateType(pokemon),
          category: translateCategory(noIndex),
          description: translateDescription(noIndex),
          form: translateForm(pokemon),
          class: translateClass(pokemon),
          // Evolutions.
          familyId: pokemon.familyId,
          evolutions: formatEvolutions(pokemon),
          // Stats and moves.
          stats: pokemon.stats,
          quickMoves: getMoveByIds(pokemon.quickMoves),
          cinematicMoves: getMoveByIds(pokemon.cinematicMoves),
          eliteQuickMoves: getMoveByIds(pokemon.eliteQuickMove),
          eliteCinematicMoves: getMoveByIds(pokemon.eliteCinematicMove),
          // Extra.
          cpTable: {
            15: calculateCP(15.0, pokemon),
            20: calculateCP(20.0, pokemon),
            25: calculateCP(25.0, pokemon),
            30: calculateCP(30.0, pokemon),
            35: calculateCP(35.0, pokemon),
            40: calculateCP(40.0, pokemon),
            50: calculateCP(50.0, pokemon),
            51: calculateCP(51.0, pokemon),
          },
        };

        const hasSamePokemon = prev.some((pokemon) =>
          pokemon.pokemonId === pokemonInstance.pokemonId &&
          pokemon.form === pokemonInstance.form
        );

        if (!hasSamePokemon) {
          // Add pokemon.
          prev.push(pokemonInstance);

          // Add mega evolution pokemons.
          prev.push(...createTempEvolutionPokemonInstances(pokemon, pokemonInstance));
        }
      }
    }

    return prev;
  }, []);

  return pokemons;
};

export {
  getPokemons,
};
