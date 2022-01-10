
import { ApplicationAction, loadCardDataReducer, setCardLibStatusReducer, setPageReducer } from "./actions";
import { ApplicationState } from "./models";


const actionHandler = (
  state: ApplicationState,
  action: ApplicationAction
): ApplicationState => {
  try {
    switch (action.type) {
      case 'setPageAction':
        return setPageReducer(state, action.data);
      case 'loadCardDataAction':
        return loadCardDataReducer(state, action.data);
      case 'setCardLibStatusAction':
        return setCardLibStatusReducer(state, action.data);

    }
  } catch (e) {
    // When a reducer throws an error, announce the issue and use the last good state to keep things rolling
    console.error('ActionHandler failed at action: ', action, ' with error: ', e);
    return state;
  }
}

export const applicationContextHandler = (
  state: ApplicationState,
  action: ApplicationAction | ApplicationAction[]
): ApplicationState => {
  if (Array.isArray(action)) {
    return action.reduce(
      (aggregateState, currentAction) =>
        actionHandler(aggregateState, currentAction),
      state
    );
  } else {
    return actionHandler(state, action);
  }
};