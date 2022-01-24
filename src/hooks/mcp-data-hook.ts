import React from 'react';
import { Affiliation, CharacterCard, CrisisCard, InfinityGem, McpData, McpDataType, TeamTacticsCard } from '../service-models/card-models';
import { useApplicationContext } from '../state/application-context';
import { Status } from '../state/models';

const defaultCrisis: CrisisCard = {
    id: '',
    crisis: '',
    threatLevel: '',
    setup: '',
    type: '',
    cp: '',
    card: '',
    searchString: ''
};

const defaultCharacter: CharacterCard = {
    id: '',
    name: '',
    alias: '',
    injured: '',
    healthy: '',
    affiliations: [],
    threatLevel: '',
    cp: '',
    searchString: '',
    gemCapacity: 0,
    gemsAvailable: [],
    leader: ''
};

const defaultAffiliation: Affiliation = {
    id: '',
    name: '',
    characterIds: [],
    leaders: [],
    teamTactics: []
};

const defaultGem: InfinityGem = {
    id: '',
    name: '',
    color: '',
    threatLevel: 0
};

const defaultTactic: TeamTacticsCard= {
    id: '',
    tactic: '',
    affiliations: [],
    characters: [],
    cp: '',
    card: '',
    searchString: ''
};

const getDefaultForMcpDataType = (dataType: McpDataType): McpData => {
    switch(dataType) {
        case McpDataType.affiliation:
            return defaultAffiliation;
        case McpDataType.character:
            return defaultCharacter;
        case McpDataType.crisis:
            return defaultCrisis;
        case McpDataType.infinityGem:
            return defaultGem;
        case McpDataType.tactic:
            return defaultTactic;
    }

};

export const McpDataHook = (id: string, dataType: McpDataType): McpData => {
    const [applicationState] = useApplicationContext();

    if(applicationState.cardLibraryStatus !== Status.ready) {
        return getDefaultForMcpDataType(dataType);
    };

    const data = applicationState.mcpData[id] ?? null;

    if(data === null) {
        console.warn('Failed to retrieve McpData for key: ', id);
        return getDefaultForMcpDataType(dataType);
    };

    // By spreading the default model for a given type we provide safety in cases where
    // the returned data does not match the expected dataType.
    switch(dataType) {
        case McpDataType.affiliation:
            return {
                ...defaultAffiliation,
                ...data
            } as Affiliation;

        case McpDataType.character:
            return {
                ...defaultCharacter,
                ...data
            } as CharacterCard;

        case McpDataType.crisis:
            return { 
                ...defaultCrisis,
                ...data
            } as CrisisCard;

        case McpDataType.infinityGem:
            return {
                ...defaultGem,
                ...data
            } as InfinityGem;

        case McpDataType.tactic:
            return {
                ...defaultTactic,
                ...data
            } as TeamTacticsCard;
    };
};

