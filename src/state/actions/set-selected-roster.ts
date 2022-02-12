import { ApplicationState } from '../models';

export interface SetSelectedRosterActionArgs {
    rosterId: string | null;
}

export interface SetSelectedRosterAction {
    type: 'setSelectedRosterAction';
    data: SetSelectedRosterActionArgs;
}

export const setSelectedRosterActionCreator = (data: SetSelectedRosterActionArgs): SetSelectedRosterAction => ({
  type: 'setSelectedRosterAction',
  data,
});

export const setSelectedRosterReducer = (state: ApplicationState, { rosterId }: SetSelectedRosterActionArgs): ApplicationState => {
  const nextState: ApplicationState = {
    ...state,
    rosterState: {
      ...state.rosterState,
      selectedRosterId: rosterId,
    },
  };

  return nextState;
};
