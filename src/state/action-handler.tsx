import {
  ApplicationAction,
  createRosterReducer,
  deleteRosterReducer,
  loadCardDataReducer,
  loadRosterReducer,
  saveRosterReducer,
  setCardLibStatusReducer,
  setPageReducer,
  setSelectedRosterReducer,
  updateRosterReducer
} from './actions';
import { ApplicationState } from './models';

const actionHandler = (
  state: ApplicationState,
  action: ApplicationAction,
): ApplicationState => {
  try {
    switch (action.type) {
      case 'setPageAction':
        return setPageReducer(state, action.data);
      case 'loadCardDataAction':
        return loadCardDataReducer(state, action.data);
      case 'setCardLibStatusAction':
        return setCardLibStatusReducer(state, action.data);
      case 'loadRosterAction':
        return loadRosterReducer(state);
      case 'saveRosterAction':
        return saveRosterReducer(state);
      case 'createRosterAction':
        return createRosterReducer(state, action.data);
      case 'deleteRosterAction':
        return deleteRosterReducer(state, action.data);
      case 'updateRosterAction':
        return updateRosterReducer(state, action.data);
      case 'setSelectedRosterAction':
        return setSelectedRosterReducer(state, action.data);
      default:
        return state;
    }
  } catch (e) {
    // When a reducer throws an error, announce the issue and use the
    // last good state to keep things rolling
    console.error(
      'ActionHandler failed at action: ',
      action,
      ' with error: ',
      e,
    );
    return state;
  }
};

export const applicationContextHandler = (
  state: ApplicationState,
  action: ApplicationAction | ApplicationAction[],
): ApplicationState => {
  if (Array.isArray(action)) {
    return action.reduce(
      (aggregateState, currentAction) => actionHandler(aggregateState, currentAction),
      state,
    );
  }
  return actionHandler(state, action);
};
