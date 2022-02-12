import { setArrayRecord } from '../../local-storage-service';
import { ApplicationState, Roster } from '../models';

export interface DeleteRosterActionArgs {
    rosterId: string;
}

export interface DeleteRosterAction {
    type: 'deleteRosterAction';
    data: DeleteRosterActionArgs;
}

export const deleteRosterActionCreator = (data: DeleteRosterActionArgs): DeleteRosterAction => ({
  type: 'deleteRosterAction',
  data,
});

export const deleteRosterReducer = (state: ApplicationState, { rosterId }: DeleteRosterActionArgs): ApplicationState => {
  const unsortedRosterList = state.rosterList.filter((roster) => roster.id !== rosterId);
  const nextRosterList = unsortedRosterList.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });

  const nextState = {
    ...state,
    rosterList: nextRosterList,
  };

  // Save to disk
  // setArrayRecord<Roster>('roster', nextRosterList);

  return nextState;
};
