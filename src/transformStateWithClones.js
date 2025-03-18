'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateO = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const obj of Object.keys(stateO)) {
        delete stateO[obj];
      }
      array.push(structuredClone(stateO));
    }

    if (action.type === 'addProperties') {
      Object.assign(stateO, action.extraData);
      array.push(structuredClone(stateO));
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        const store = action.keysToRemove[i];

        for (const ste of Object.keys(stateO)) {
          if (ste === store) {
            delete stateO[ste];
          }
        }
      }
      array.push(structuredClone(stateO));
    }
  }

  return array;
}

module.exports = transformStateWithClones;
