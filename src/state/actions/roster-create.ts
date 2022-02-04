import { setArrayRecord } from "../../local-storage-service";
import { UNAFFILIATED } from "../../service-models/card-models";
import { ApplicationState, Roster } from "../models";

export interface CreateRosterActionArgs {
    name: string;
};

export interface CreateRosterAction {
    type: 'createRosterAction';
    data: CreateRosterActionArgs;
};

export const createRosterActionCreator = (data: CreateRosterActionArgs): CreateRosterAction => ({
    type: 'createRosterAction',
    data
});

export const createRosterReducer = (state: ApplicationState, { name }: CreateRosterActionArgs): ApplicationState => {
    const rosterId = `${name.toLocaleLowerCase().replaceAll(' ', '-')}-${Date.now()}`;

    const newRoster:Roster = {
        id: rosterId,
        name,
        charactersIds: [],
        tacticsIds: [],
        affiliation: UNAFFILIATED
    };
    
    const unsortedRosterList = [ newRoster, ...state.rosterList];
    const nextRosterList = unsortedRosterList.sort((a,b) => {
        if(a.name < b.name) {
            return -1;
        }

        if(a.name > b.name) {
            return 1;
        }

        return 0;
    });

    const nextState = {
        ...state,
        rosterList: nextRosterList,
    };

    // Save to disk
    //setArrayRecord<Roster>('roster', nextRosterList);

    return nextState;
};