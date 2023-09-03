// Node modules.
import _ from 'lodash';
// Local modules.
import { CombatMoveRaw, BaseMoveRaw, Move } from 'src/models/move';
import { getGameMaster } from 'src/gameMaster';
import { translateName } from 'src/move/name';
import { translateType } from 'src/move/type';

type BaseMove = Pick<Move, 'uniqueId' | 'no' | 'name' | 'type'> & Move['base'];

type CombatMove = Pick<Move, 'uniqueId' | 'no' | 'name' | 'type'> & Move['combat'];

const getMoves = () => {
  const gameMaster = getGameMaster();

  const moves = gameMaster.reduce<BaseMove[]>((prev, template) => {
    /**
     * @example input: 'V0013_MOVE_WRAP'
     */
    const matches = template.templateId.match(/^V(\d+)_MOVE_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: moveName } = matches;
      const move = template.data.moveSettings as BaseMoveRaw;

      prev.push({
        uniqueId: move.movementId,
        no: parseInt(noIndex),
        name: translateName(noIndex),
        type: translateType(move),
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

const getCombatMoves = () => {
  const gameMaster = getGameMaster();

  const combatMoves = gameMaster.reduce<CombatMove[]>((prev, template) => {
    /**
     * @example input: 'COMBAT_V0014_MOVE_HYPER_BEAM'
     */
    const matches = template.templateId.match(/^COMBAT_V(\d+)_MOVE_(\w+)$/);

    if (matches) {
      const { 1: noIndex, 2: combatMoveName } = matches;
      const combatMove = template.data.combatMove as CombatMoveRaw;

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

const allMoves = getMoves();

const allCombatMoves = getCombatMoves();

const getMoveById = (uniqueId: string) => {
  const move = allMoves.find((move) => move.uniqueId === uniqueId) ?? null;
  return move;
};

const getCombatMoveById = (uniqueId: string) => {
  const combatMove = allCombatMoves.find((move) => move.uniqueId === uniqueId) ?? null;
  return combatMove;
};

const getMoveByIds = (moveUniqueIds: string[] = []) => {
  const baseMoves = _.compact(moveUniqueIds.map(getMoveById));
  const combatMoves = _.compact(moveUniqueIds.map(getCombatMoveById));

  const moves = baseMoves.map((baseMove) => {
    const sameFields = ['no', 'name', 'uniqueId', 'type'] as const;
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
