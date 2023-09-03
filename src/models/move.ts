/**
 * `data.combatMove` of game master.
 *
 * * `templateId`: `COMBAT_Vxxxx_MOVE_xxxx`
 */
interface CombatMoveRaw {
  uniqueId: string;
  type: string;
  power: number;
  energyDelta: number;
  vfxName: string;
  durationTurns?: number;
  buffs?: {
    attackerAttackStatStageChange?: number;
    attackerDefenseStatStageChange?: number;
    targetAttackStatStageChange?: number;
    targetDefenseStatStageChange?: number;
    buffActivationChance: number;
  };
}

/**
 * `data.moveSettings` of game master.
 *
 * * `templateId`: `Vxxxx_MOVE_xxxx`
 */
interface BaseMoveRaw {
  movementId: string;
  animationId: number;
  pokemonType: string;
  power: number;
  staminaLossScalar: number;
  trainerLevelMin: number;
  trainerLevelMax: number;
  vfxName: string;
  durationMs: number;
  damageWindowStartMs: number;
  damageWindowEndMs: number;
  energyDelta: number;
  // Quick Move
  accuracyChance?: number;
  // Cinematic Move
  criticalChance?: number;
}

/**
 * Pokemon data
 */
interface Move {
  uniqueId: string;
  no: number;
  name: string;
  type: string;
  base: {
    power: number;
    staminaLossScalar: number;
    durationMs: number;
    energyDelta: number;
    accuracyChance?: number;
    criticalChance?: number;
  };
  combat: {
    power: number;
    energyDelta: number;
    durationTurns?: number;
    buffs?: {
      attackerAttackStatStageChange?: number;
      attackerDefenseStatStageChange?: number;
      targetAttackStatStageChange?: number;
      targetDefenseStatStageChange?: number;
      buffActivationChance: number;
    };
  };
}

export {
  CombatMoveRaw,
  BaseMoveRaw,
  Move,
};
