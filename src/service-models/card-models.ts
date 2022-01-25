export const UNAFFILIATED = 'unaffiliated';

export interface CharacterCard {
  id: string;
  name: string;
  threatLevel: string;
  alias: string;
  affiliations: string[];
  cp: string;
  healthy: string;
  injured: string;
  searchString: string;
  gemCapacity: number;
  gemsAvailable: string[];
  leader: string;
}

export interface CrisisCard {
  id: string;
  crisis: string;
  threatLevel: string;
  setup: string;
  type: string;
  cp: string;
  card: string;
  searchString: string;
}

export interface TeamTacticsCard {
  id: string;
  tactic: string;
  affiliations: string[];
  characters: string[];
  cp: string;
  card: string;
  searchString: string;
}

export type Card = TeamTacticsCard | CrisisCard | CharacterCard;
export type McpData = TeamTacticsCard | CrisisCard | CharacterCard | Affiliation | InfinityGem;

// Local model
export enum McpDataType {
  mcpData,
  crisis,
  character,
  infinityGem,
  tactic,
  affiliation
}

export interface InfinityGem {
    id: string;
    name: string;
    color: string;
    threatLevel: number;
    searchString: string;
}

export interface Affiliation {
  id: string;
  name: string;
  characterIds: string[];
  teamTactics: string[];
  leaders: string[];
  searchString: string;
}

export interface CardData {
  created: Date;
  characters: CharacterCard[];
  crisisCards: CrisisCard[];
  teamTactics: TeamTacticsCard[];
}

// Card data v2, remove CardData when everyone is migrated.
export interface CardDataV2 extends CardData {
  deployments: CrisisCard[];
  gems: InfinityGem[];
  affiliations: Affiliation[];
}