import { UpdateRosterAction, UpdateRosterActionArgs } from ".";
import { McpDataType } from "../../service-models/card-models";
import { ApplicationState } from "../models";

interface addRosterCardActionArgs {
    cardType: McpDataType;
    rosterId: string;
    charactersIds?: [];
    tacticsIds?: [];
    state: ApplicationState;
}

export const addRosterCardActionCreator = ({ state, charactersIds = [], tacticsIds = [], rosterId, cardType }: addRosterCardActionArgs): UpdateRosterAction => {
    const roster = state.rosterList.find((roster) => roster.id === rosterId) ?? null;

    const idsToAdd = cardType === McpDataType.character ? charactersIds : tacticsIds;
    const cardKey = cardType === McpDataType.character ? 'charactersIds' : 'tacticsIds' 

    const data: UpdateRosterActionArgs = {
        rosterId,
        [cardKey]: [...(roster?.[cardKey] ?? []), ...idsToAdd]
    };

    console.log({
        type: 'updateRosterAction',
        data
    });

    return {
        type: 'updateRosterAction',
        data
    }
};
