import { selectCardsAndKey, UpdateRosterAction, UpdateRosterActionArgs } from ".";
import { McpDataType } from "../../service-models/card-models";
import { ApplicationState } from "../models";

interface removeRosterCardActionArgs {
    cardType: McpDataType;
    rosterId: string;
    charactersIds?: [];
    tacticsIds?: [];
    crisisIds?: [];
    state: ApplicationState;
}

export const removeRosterCardActionCreator = ({ state, charactersIds = [], tacticsIds = [], crisisIds=[], rosterId, cardType }: removeRosterCardActionArgs): UpdateRosterAction => {
    const roster = state.rosterList.find((roster) => roster.id === rosterId) ?? null;

    const [cardKey, idsToRemove] = selectCardsAndKey(cardType, charactersIds, tacticsIds, crisisIds);
    const existingIds = (roster?.[cardKey] ?? []);
    const filteredExistingIds = existingIds.filter((id: string) => idsToRemove.indexOf(id) < 0)
 
    const data: UpdateRosterActionArgs = {
        rosterId,
        [cardKey]: filteredExistingIds
    };

    console.log({
        type: 'updateRosterAction',
        data
    })
    return {
        type: 'updateRosterAction',
        data
    }
};
