// Local modules.
import * as Downloader from 'src/downloadRawdata';
import { getPokemons } from 'src/pokemon/index';

await Downloader.downloadGameMaster();
await Downloader.downloadI18n('ChineseTraditional');

describe('Move validation (👾: CHARMANDER)', () => {
  const allPokemons = getPokemons();
  const pokemons = allPokemons.filter((pokemon) => pokemon.no === 4);
  const normalPokemons = pokemons.filter((pokemon) => pokemon.form === null);

  it('Amount', () => {
    expect(normalPokemons.length).toBe(1);
  });

  it('Metadata of mega evolution', () => {
    const [megaVenusaur] = normalPokemons;

    expect(megaVenusaur.name).toBe('小火龍');
    expect(megaVenusaur.uniqueId).toBe('CHARMANDER');
    expect(megaVenusaur.types).toEqual(['火']);
    expect(megaVenusaur.form).toBe(null);
    expect(megaVenusaur.class).toBe(null);
    expect(megaVenusaur.familyId).toBe('FAMILY_CHARMANDER');
    expect(megaVenusaur.evolutions).toEqual([
      {
        uniqueId: 'CHARMELEON',
        candyCost: 25,
        energyCost: undefined,
        gender: undefined,
        item: undefined,
      },
    ]);
    expect(megaVenusaur.stats).toEqual({ baseAttack: 116, baseDefense: 93, baseStamina: 118 });
    expect(megaVenusaur.quickMoves[0]).toEqual({
      uniqueId: 'EMBER_FAST',
      no: 209,
      name: '火花',
      type: '火',
      base: {
        power: 10,
        energyDelta: 10,
        durationMs: 1000,
        staminaLossScalar: 0.01,
        accuracyChance: 1,
      },
      combat: {
        power: 7,
        energyDelta: 6,
        durationTurns: 1,
        buffs: undefined,
      },
    });
  });
});

describe('Evolution validation', () => {
  describe('Temp Evolution - Mega (👾: VENUSAUR)', () => {
    const allPokemons = getPokemons();
    const pokemons = allPokemons.filter((pokemon) => pokemon.no === 3);
    const normalPokemons = pokemons.filter((pokemon) => pokemon.form === null);
    const megaEvolutionPokemons = pokemons.filter((pokemon) => pokemon.form === '超級進化');

    it('Amount', () => {
      expect(normalPokemons.length).toBe(1);
      expect(megaEvolutionPokemons.length).toBe(1);
    });

    it('Metadata of mega evolution', () => {
      const [megaVenusaur] = megaEvolutionPokemons;

      expect(megaVenusaur.name).toBe('超級妙蛙花');
      expect(megaVenusaur.uniqueId).toBe('VENUSAUR_MEGA');
      expect(megaVenusaur.types).toEqual(['草', '毒']);
      expect(megaVenusaur.form).toBe('超級進化');
      expect(megaVenusaur.class).toBe(null);
      expect(megaVenusaur.familyId).toBe('FAMILY_BULBASAUR');
      expect(megaVenusaur.evolutions).toEqual([]);
      expect(megaVenusaur.stats).toEqual({ baseAttack: 241, baseDefense: 246, baseStamina: 190 });
    });
  });

  describe('Temp Evolution - Mega X & Mega Y (👾: CHARIZARD)', () => {
    const allPokemons = getPokemons();
    const pokemons = allPokemons.filter((pokemon) => pokemon.no === 6);
    const normalPokemons = pokemons.filter((pokemon) => pokemon.form === null);
    const megaEvolutionPokemons = pokemons.filter((pokemon) => pokemon.form === '超級進化');

    it('Amount', () => {
      expect(normalPokemons.length).toBe(1);
      expect(megaEvolutionPokemons.length).toBe(2);
    });

    it('Metadata of mega evolution', () => {
      const [megaCharizardX, megaCharizardY] = megaEvolutionPokemons;

      expect(megaCharizardX.name).toBe('超級噴火龍Ｘ');
      expect(megaCharizardX.uniqueId).toBe('CHARIZARD_MEGA_X');
      expect(megaCharizardX.types).toEqual(['火', '龍']);
      expect(megaCharizardX.form).toBe('超級進化');
      expect(megaCharizardX.class).toBe(null);
      expect(megaCharizardX.familyId).toBe('FAMILY_CHARMANDER');
      expect(megaCharizardX.evolutions).toEqual([]);
      expect(megaCharizardX.stats).toEqual({ baseAttack: 273, baseDefense: 213, baseStamina: 186 });

      expect(megaCharizardY.name).toBe('超級噴火龍Ｙ');
      expect(megaCharizardY.uniqueId).toBe('CHARIZARD_MEGA_Y');
      expect(megaCharizardY.types).toEqual(['火', '飛行']);
      expect(megaCharizardY.form).toBe('超級進化');
      expect(megaCharizardY.class).toBe(null);
      expect(megaCharizardY.familyId).toBe('FAMILY_CHARMANDER');
      expect(megaCharizardY.evolutions).toEqual([]);
      expect(megaCharizardY.stats).toEqual({ baseAttack: 319, baseDefense: 212, baseStamina: 186 });
    });
  });

  describe('Temp Evolution - Primal (👾: GROUDON)', () => {
    const allPokemons = getPokemons();
    const pokemons = allPokemons.filter((pokemon) => pokemon.no === 383);
    const normalPokemons = pokemons.filter((pokemon) => pokemon.form === null);
    const primalReversionPokemons = pokemons.filter((pokemon) => pokemon.form === '原始回歸的樣子');

    it('Amount', () => {
      expect(normalPokemons.length).toBe(1);
      expect(primalReversionPokemons.length).toBe(1);
    });

    it('Metadata of mega evolution', () => {
      const [primalGroudon] = primalReversionPokemons;

      expect(primalGroudon.name).toBe('原始固拉多');
      expect(primalGroudon.uniqueId).toBe('GROUDON_PRIMAL');
      expect(primalGroudon.types).toEqual(['地面', '火']);
      expect(primalGroudon.form).toBe('原始回歸的樣子');
      expect(primalGroudon.class).toBe('傳說的寶可夢');
      expect(primalGroudon.familyId).toBe('FAMILY_GROUDON');
      expect(primalGroudon.evolutions).toEqual([]);
      expect(primalGroudon.stats).toEqual({ baseAttack: 353, baseDefense: 268, baseStamina: 218 });
    });
  });
});
