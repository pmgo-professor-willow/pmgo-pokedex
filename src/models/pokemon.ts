// Local modules.
import { Move } from 'src/models/move';

/**
 * `data.pokemonSettings` of game master
 *
 * * `templateId`: `Vxxxx_POKEMON_xxxx`
 */
interface PokemonRaw {
  pokemonId: string;
  type: string;
  type2: string;
  stats: {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
  };
  quickMoves?: string[];
  cinematicMoves?: string[];
  eliteQuickMove?: string[];
  eliteCinematicMove?: string[];
  pokemonClass?: string;
  familyId: string;
  // In very rare cases, form may be represented using numbers.
  form?: string | number;
  thirdMove: {
    stardustToUnlock: number;
    candyToUnlock: number;
  };
  evolutionBranch?: {
    evolution?: string;
    form?: string;
    candyCost?: number;
    priority?: number;
    // Evolution requirement
    evolutionItemRequirement?: string;
    genderRequirement?: 'FEMALE' | 'MALE';
    lureItemRequirement?: string;
    kmBuddyDistanceRequirement?: number;
    mustBeBuddy?: boolean;
    onlyDaytime?: boolean;
    questDisplay?: {
      questRequirementTemplateId: string;
    }[];
    // Mega evolution
    temporaryEvolution?: string;
    temporaryEvolutionEnergyCost?: number;
    temporaryEvolutionEnergyCostSubsequent?: number;
  }[];
  tempEvoOverrides: {
    tempEvoId: string;
    stats: {
      baseStamina: number;
      baseAttack: number;
      baseDefense: number;
    };
    averageHeightM: number;
    averageWeightKg: number;
    typeOverride1: string;
    typeOverride2: string;
    camera: {
      cylinderRadiusM: number;
      cylinderHeightM: number;
      cylinderGroundM: number;
    },
    modelScaleV2: number;
    modelHeight: number;
  }[];
  shadow?: {
    purificationStardustNeeded: number;
    purificationCandyNeeded: number;
    purifiedChargeMove: string;
    shadowChargeMove: string;
  };
  isTransferable?: true;
  isDeployable?: true;
  isTradable?: true;
}

/**
 * Pokemon data
 */
interface Pokemon {
  uniqueId: string;
  pokemonId: string;
  no: number;
  name: string;
  types: string[];
  category: string;
  description: string;
  form: string | null;
  class: string | null;
  familyId: string;
  evolutions: {
    candyCost?: number;
    energyCost?: number;
    evolutionItemRequirement?: string;
    genderRequirement?: 'FEMALE' | 'MALE';
  }[];
  stats: {
    baseStamina: number;
    baseAttack: number;
    baseDefense: number;
  };
  quickMoves: Move[];
  cinematicMoves: Move[];
  eliteQuickMoves: Move[];
  eliteCinematicMoves: Move[];
  cpTable: {
    [level: number]: number;
  };
};

export {
  PokemonRaw,
  Pokemon,
};
