import { UpdateRosterAction, UpdateRosterActionArgs } from ".";
import { McpDataType } from "../../service-models/card-models";
import { ApplicationState } from "../models";

interface removeRosterCardActionArgs {
    cardType: McpDataType;
    rosterId: string;
    charactersIds?: [];
    tacticsIds?: [];
    state: ApplicationState;
}

export const removeRosterCardActionCreator = ({ state, charactersIds = [], tacticsIds = [], rosterId, cardType }: removeRosterCardActionArgs): UpdateRosterAction => {
    const roster = state.rosterList.find((roster) => roster.id === rosterId) ?? null;

    const idsToRemove: string[] = cardType === McpDataType.character ? charactersIds : tacticsIds;
    const cardKey = cardType === McpDataType.character ? 'charactersIds' : 'tacticsIds';

    const existingIds = (roster?.[cardKey] ?? []);
    const filteredExistingIds = existingIds.filter((id) => idsToRemove.indexOf(id) < 0)
 
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
