import { setArrayRecord } from '../../local-storage-service';
import { ApplicationState, Roster } from '../models';

export interface SaveRosterAction {
  type: 'saveRosterAction';
}

export const saveRosterActionCreator = (): SaveRosterAction => ({
  type: 'saveRosterAction',
});

export const saveRosterReducer = (
  state: ApplicationState,
): ApplicationState => {
  setArrayRecord<Roster>('roster', state.rosterList);

  return state;
};
