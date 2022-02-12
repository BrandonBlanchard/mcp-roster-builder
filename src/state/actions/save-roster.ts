import { setArrayRecord } from '../../local-storage-service';
import { ApplicationState, Roster } from '../models';

export interface SaveRosterActionArgs {}

export interface SaveRosterAction {
    type: 'saveRosterAction';
    data: SaveRosterActionArgs;
}

export const saveRosterActionCreator = (data: SaveRosterActionArgs): SaveRosterAction => ({
  type: 'saveRosterAction',
  data,
});

export const saveRosterReducer = (state: ApplicationState, { }: SaveRosterActionArgs): ApplicationState => {
  setArrayRecord<Roster>('roster', state.rosterList);

  return state;
};
