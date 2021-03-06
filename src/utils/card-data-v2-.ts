import {
  Affiliation,
  CharacterCard,
  CrisisCard,
  InfinityGem,
  McpData,
  McpDataType,
  TeamTacticsCard
} from '../service-models/card-models';
import { ApplicationState, Roster, Status } from '../state/models';

export const defaultCrisis: CrisisCard = {
  id: '',
  crisis: '',
  threatLevel: '',
  setup: '',
  type: '',
  cp: '',
  card: '',
  searchString: '',
};

export const defaultCharacter: CharacterCard = {
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
  leader: '',
};

export const defaultAffiliation: Affiliation = {
  id: '',
  name: '',
  characterIds: [],
  leaders: [],
  teamTactics: [],
  searchString: '',
};

export const defaultGem: InfinityGem = {
  id: '',
  name: '',
  color: '',
  threatLevel: 0,
  searchString: '',
};

export const defaultTactic: TeamTacticsCard = {
  id: '',
  tactic: '',
  affiliations: [],
  characters: [],
  cp: '',
  card: '',
  searchString: '',
};

export const defaultMcpData: McpData = {
  id: '',
  tactic: '',
  affiliations: [],
  characters: [],
  cp: '',
  card: '',
  searchString: '',
  name: '',
  color: '',
  threatLevel: 0,
  characterIds: [],
  leaders: [],
  teamTactics: [],
  alias: '',
  injured: '',
  healthy: '',
  gemCapacity: 0,
  gemsAvailable: [],
  leader: '',
};

export const defaultRoster: Roster = {
  id: '',
  name: '',
  affiliation: '',
  tacticsIds: [],
  charactersIds: [],
  crisisIds: [],
};

const getDefaultForMcpDataType = (dataType: McpDataType): McpData => {
  switch (dataType) {
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
    default:
      return defaultMcpData;
  }
};

export const getCardForDataType = (
  applicationState: ApplicationState,
  id: string,
  dataType: McpDataType
): McpData => {
  if (applicationState.cardLibraryStatus !== Status.ready) {
    return getDefaultForMcpDataType(dataType);
  }

  const data = applicationState.mcpData[id] ?? null;

  if (data === null) {
    console.warn('Failed to retrieve McpData for key: ', id);
    return getDefaultForMcpDataType(McpDataType.mcpData);
  }

  // By spreading the default model for a given type we provide safety in cases where
  // the returned data does not match the expected dataType.
  switch (dataType) {
    case McpDataType.affiliation:
      return {
        ...defaultAffiliation,
        ...data,
      } as Affiliation;

    case McpDataType.character:
      return {
        ...defaultCharacter,
        ...data,
      } as CharacterCard;

    case McpDataType.crisis:
      return {
        ...defaultCrisis,
        ...data,
      } as CrisisCard;

    case McpDataType.infinityGem:
      return {
        ...defaultGem,
        ...data,
      } as InfinityGem;

    case McpDataType.tactic:
      return {
        ...defaultTactic,
        ...data,
      } as TeamTacticsCard;

    case McpDataType.mcpData:
    default:
      return {
        ...defaultMcpData,
        ...data,
      } as McpData;
  }
};
