// Local modules.
import { PokemonRaw } from 'src/models/pokemon';
import { getGameMaster } from 'src/gameMaster';
import { translateName } from 'src/pokemon/name';
import { translateType } from 'src/pokemon/type';
import { translateClass } from 'src/pokemon/class';
import { translateForm } from 'src/pokemon/form';
import { translateCategory } from 'src/pokemon/category';
import { translateDescription } from 'src/pokemon/description';
import { getMoveByIds } from 'src/move/index';

const getPokemons = async () => {
  const gameMaster = await getGameMaster();

  const pokemons = gameMaster.reduce<any[]>((prev, template) => {
    /**
     * @example input: 'V0001_POKEMON_BULBASAUR'
     */
    const matches = template.templateId.match(/^V(\d+)_POKEMON_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: pokemonNameIndex } = matches;
      const pokemon = template.data.pokemonSettings as PokemonRaw;

      if (pokemon) {
        const maxStatuses: [atk: number, def: number, hp: number] = [
          pokemon.stats.baseAttack + 15,
          pokemon.stats.baseDefense + 15,
          pokemon.stats.baseStamina + 15,
        ];

        const hasMegaEvolution = !!pokemon.tempEvoOverrides;

        const pokemonInstance = {
          uniqueId: pokemon.pokemonId,
          no: parseInt(noIndex),
          name: translateName(noIndex),
          types: translateType(pokemon),
          category: translateCategory(noIndex),
          description: translateDescription(noIndex),
          form: translateForm(pokemon),
          class: translateClass(pokemon),
          // Evolutions.
          familyId: pokemon.familyId,
          // evolutions: formatEvolutions(pokemon.pokemonId, pokemon.evolutionBranch),
          // Stats and moves.
          stats: pokemon.stats,
          quickMoves: getMoveByIds(pokemon.quickMoves),
          cinematicMoves: getMoveByIds(pokemon.cinematicMoves),
          // cinematicMoves: mapMoves(moveDict, compact([
          //     ...pokemon.cinematicMoves || [],
          //     form === 'PURIFIED' ? 'RETURN' : null,
          //     form === 'SHADOW' ? 'FRUSTRATION' : null,
          // ])),
          eliteQuickMoves: getMoveByIds(pokemon.eliteQuickMove),
          eliteCinematicMoves: getMoveByIds(pokemon.eliteCinematicMove),
          // Extra.
          // cpTable: {
          //     15: calculateCP(15.0, ...maxStatuses),
          //     20: calculateCP(20.0, ...maxStatuses),
          //     25: calculateCP(25.0, ...maxStatuses),
          //     30: calculateCP(30.0, ...maxStatuses),
          //     35: calculateCP(35.0, ...maxStatuses),
          //     40: calculateCP(40.0, ...maxStatuses),
          //     50: calculateCP(50.0, ...maxStatuses),
          // },
          // greatLeague: getRanking(pokemon.pokemonId, 'great', form),
          // ultraLeague: getRanking(pokemon.pokemonId, 'ultra', form),
          // masterLeague: getRanking(pokemon.pokemonId, 'master', form),
        };

        // // Extend community day information in moves.
        // extendCommunityDayMove(pokemon.pokemonId, pokemonInstance.eliteQuickMoves);
        // extendCommunityDayMove(pokemon.pokemonId, pokemonInstance.eliteCinematicMoves);

        // // Add mega evolution.
        // if (!isIgnored(pokemonInstance.no, pokemonInstance.form)) {
        //   prev.push(pokemonInstance);

        //   if (hasMegaEvolution && pokemonInstance.form === 'NORMAL') {
        //     const megaPokemonInstances = genMegaPokemonInstances(pokemonInstance, pokemon.tempEvoOverrides);
        //     prev.push(...megaPokemonInstances);
        //   }
        // }

        const hasSamePokemon = prev.some((pokemon) =>
          pokemon.uniqueId === pokemonInstance.uniqueId &&
          pokemon.form === pokemonInstance.form
        );

        if (!hasSamePokemon) {
          prev.push(pokemonInstance);
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
