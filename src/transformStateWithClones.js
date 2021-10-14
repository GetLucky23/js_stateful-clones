'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  let stateNew = { ...state };
  let stateTemp = {}; // needed for temporary fixing stateNew results

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateNew = Object.assign(stateNew, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const keyRemoved of action.keysToRemove) {
        delete stateNew[keyRemoved];
      }
    } else if (action.type === 'clear') {
      for (const keyCleared in stateNew) {
        delete stateNew[keyCleared];
      }
    } else {
      continue;
    }

    stateTemp = { ...stateNew }; // get a fixed copy of current stateNew
    arrayResult.push(stateTemp); // push this fixed copy to resultArray
  }

  return arrayResult;
}

/* FOR DEBUGGING ONLY:
1) index.html in folder 'projects' includes this js file;
1.1) open index.html in browser;
2) lines below are copied down from testfile (only );
3) put them below (function) and above (module.exports);
4) write 'debugger;' before code;
4.1) run debugger;
*/

transformStateWithClones({
  foo: 'bar', bar: 'foo',
}, /* current situation of 'state' - FROM TEST.JS */ [
  {
    type: 'addProperties',
    extraData: {
      name: 'Jim', hello: 'world',
    },
  },
  {
    type: 'removeProperties', keysToRemove: ['bar', 'hello'],
  },
  {
    type: 'addProperties', extraData: { another: 'one' },
  },
])/* test and current situation of 'actions' - FROM TEST.JS */;

module.exports = transformStateWithClones;
