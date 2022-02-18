import { UpdateRosterAction, UpdateRosterActionArgs } from '.';
import { McpDataType } from '../../service-models/card-models';
import { ApplicationState } from '../models';

interface addRosterCardActionArgs {
  cardType: McpDataType;
  rosterId: string;
  charactersIds?: [];
  tacticsIds?: [];
  crisisIds?: [];
  state: ApplicationState;
}

export const selectCardsAndKey = (
  cardType: McpDataType,
  charactersIds: string[],
  tacticsIds: string[],
  crisisIds: string[],
): [string, string[]] => {
  switch (cardType) {
    case McpDataType.character:
      return ['charactersIds', charactersIds];
    case McpDataType.tactic:
      return ['tacticsIds', tacticsIds];
    case McpDataType.crisis:
      return ['crisisIds', crisisIds];
    default:
      return ['', []];
  }
};

export const addRosterCardActionCreator = ({
  state,
  charactersIds = [],
  tacticsIds = [],
  crisisIds = [],
  rosterId,
  cardType,
}: addRosterCardActionArgs): UpdateRosterAction => {
  const roster =
    state.rosterList.find(roster => roster.id === rosterId) ?? null;
  const [cardKey, idsToAdd] = selectCardsAndKey(
    cardType,
    charactersIds,
    tacticsIds,
    crisisIds,
  );

  if (cardKey === '') {
    // Empty action, will be discarded by the reducer
    return { type: 'updateRosterAction', data: { rosterId: '' } };
  }

  const data: UpdateRosterActionArgs = {
    rosterId,
    [cardKey]: [...(roster?.[cardKey] ?? []), ...idsToAdd],
  };

  console.log({
    type: 'updateRosterAction',
    data,
  });

  return {
    type: 'updateRosterAction',
    data,
  };
};
