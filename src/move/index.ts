// Node modules.
import _ from 'lodash';
// Local modules.
import { CombatMove, Move } from 'src/models/move';
import { getGameMaster } from 'src/gameMaster';
import { translateName } from 'src/move/name';
import { translateType } from 'src/move/type';

const getMoves = async () => {
  const gameMaster = await getGameMaster();

  const moves = gameMaster.reduce<any[]>((prev, template) => {
    /**
     * @example input: 'V0013_MOVE_WRAP'
     */
    const matches = template.templateId.match(/^V(\d+)_MOVE_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: moveName } = matches;
      const move = template.data.moveSettings as Move;

      prev.push({
        name: translateName(noIndex),
        no: parseInt(noIndex),
        uniqueId: move.movementId,
        type: move.type,
        power: move.power,
        accuracyChance: move.accuracyChance,
        staminaLossScalar: move.staminaLossScalar,
        durationMs: move.durationMs,
        energyDelta: move.energyDelta,
      });
    }

    return prev;
  }, []);

  return moves;
};

const getCombatMoves = async () => {
  const gameMaster = await getGameMaster();

  const combatMoves = gameMaster.reduce<any[]>((prev, template) => {
    /**
     * @example input: 'COMBAT_V0014_MOVE_HYPER_BEAM'
     */
    const matches = template.templateId.match(/^COMBAT_V(\d+)_MOVE_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: combatMoveName } = matches;
      const combatMove = template.data.combatMove as CombatMove;

      prev.push({
        uniqueId: combatMove.uniqueId,
        no: parseInt(noIndex),
        name: translateName(noIndex),
        type: translateType(combatMove),
        power: combatMove.power,
        energyDelta: combatMove.energyDelta,
        durationTurns: combatMove.durationTurns,
        buffs: combatMove.buffs,
      });
    }

    return prev;
  }, []);

  return combatMoves;
};

const allMoves = await getMoves();

const allCombatMoves = await getCombatMoves();

const getMoveById = (uniqueId: string) => {
  const move = allMoves.find((move) => move.uniqueId === uniqueId) ?? null;
  return move;
};

const getCombatMoveById = (uniqueId: string) => {
  const combatMove = allCombatMoves.find((move) => move.uniqueId === uniqueId) ?? null;
  return combatMove;
};

const getMoveByIds = (moveUniqueIds: string[] = []) => {
  const baseMoves = moveUniqueIds.map(getMoveById);
  const combatMoves = moveUniqueIds.map(getCombatMoveById);

  const moves = baseMoves.map((baseMove) => {
    const sameFields = ['no', 'name', 'uniqueId', 'type'];
    const combatMove = combatMoves.find((move) => move.uniqueId === baseMove.uniqueId);

    return {
      ..._.pick(baseMove, sameFields),
      base: _.omit(baseMove, sameFields),
      combat: _.omit(combatMove, sameFields),
    };
  });

  return moves;
};

export {
  getMoveByIds,
};
