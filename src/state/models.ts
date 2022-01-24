import { Affiliation, CardData, CharacterCard, CrisisCard, InfinityGem, McpData, TeamTacticsCard } from "../service-models/card-models";

export enum Page {
    home,
    search,
    play,
    roster
}

export enum Status {
  init,
  loading,
  ready,
  failed
}

export interface Roster {
  id: string;
  name: string;
  charactersIds: string[];
  affiliation: string;
}

export interface RosterState {
  selectedRosterId: string | null;
}

export interface ApplicationState {
  page: Page;
  cardLibrary: CardData | null;
  cardLibraryStatus: Status;
  rosterList: Roster[];
  rosterState: RosterState;

  mcpData: Partial<Record<string, McpData>>;

  affiliations: string[];
  gems: string[];
  characters: string[];
  crisis: string[];
  tactics: string[];
  deploymentLetterToId: Record<string, string>
};