/**
 * `data.combatMove` of game master.
 *
 * * `templateId`: `COMBAT_Vxxxx_MOVE_xxxx`
 */
interface CombatMove {
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
interface Move {
  movementId: string;
  animationId: number;
  type: string;
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

export {
  CombatMove,
  Move,
};
