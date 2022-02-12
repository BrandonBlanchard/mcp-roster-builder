import { getArrayRecord } from '../../local-storage-service';
import { defaultRoster } from '../../utils/card-data-v2-';
import { ApplicationState, Roster } from '../models';

export interface LoadRosterActionArgs {}

export interface LoadRosterAction {
    type: 'loadRosterAction';
    data: LoadRosterActionArgs;
}

export const loadRosterActionCreator = (data: LoadRosterActionArgs): LoadRosterAction => ({
  type: 'loadRosterAction',
  data,
});

export const loadRosterReducer = (state: ApplicationState, { }: LoadRosterActionArgs): ApplicationState => {
  const rosterData = getArrayRecord<Roster>('roster');

  const nextState = {
    ...state,
    rosterList: rosterData.map((roster) => ({ ...defaultRoster, ...roster })),
  };

  return nextState;
};
