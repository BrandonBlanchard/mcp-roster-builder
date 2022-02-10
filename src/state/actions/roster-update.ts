import { ApplicationState, Roster } from "../models";

export interface UpdateRosterActionArgs extends Partial<Roster> {
    rosterId: string;
};

export interface UpdateRosterAction {
    type: 'updateRosterAction';
    data: UpdateRosterActionArgs;
};

export const updateRosterActionCreator = (data: UpdateRosterActionArgs): UpdateRosterAction => ({
    type: 'updateRosterAction',
    data
});

interface RosterListParts {
    roster: Roster | null;
    before: Roster[];
    after: Roster[];
}

export const updateRosterReducer = (state: ApplicationState, { rosterId, tacticsIds, charactersIds, crisisIds, name }: UpdateRosterActionArgs): ApplicationState => {
    const { roster, before, after }: RosterListParts  = state.rosterList.reduce((agg: RosterListParts, rosterItem: Roster) => {
        if (agg.roster !== null) {
            agg.after.push(rosterItem);
        }

        if(rosterItem.id === rosterId) {
            agg.roster = rosterItem;
        }

        if(agg.roster === null) {
            agg.before.push(rosterItem);
        }
        
        return agg;

    }, { roster: null, before: [], after: [],  } as RosterListParts)

    if (roster === null) {
        return state;
    }

    const nextRoster: Roster = {
        ...roster,
        name: name ?? roster.name,
        tacticsIds: tacticsIds ?? roster.tacticsIds,
        charactersIds: charactersIds ?? roster.charactersIds,
        crisisIds: crisisIds ?? roster.crisisIds
    };

    const nextRosterList = [...before, nextRoster, ...after];

    const nextState = {
        ...state,
        rosterList: nextRosterList,
    };

    return nextState;
};