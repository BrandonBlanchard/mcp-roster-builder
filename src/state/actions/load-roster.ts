import { getArrayRecord } from '../../local-storage-service';
import { defaultRoster } from '../../utils/card-data-v2-';
import { ApplicationState, Roster } from '../models';

export interface LoadRosterAction {
  type: 'loadRosterAction';
}

export const loadRosterActionCreator = (): LoadRosterAction => ({
  type: 'loadRosterAction',
});

export const loadRosterReducer = (
  state: ApplicationState,
): ApplicationState => {
  const rosterData = getArrayRecord<Roster>('roster');

  const nextState = {
    ...state,
    rosterList: rosterData.map(roster => ({ ...defaultRoster, ...roster })),
  };

  return nextState;
};
