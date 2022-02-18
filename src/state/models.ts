import { CardData, McpData } from '../service-models/card-models';

export enum Page {
  home,
  search,
  play,
  roster,
  rosterBuilder,
}

export enum Status {
  init,
  loading,
  ready,
  failed,
}

export interface Roster extends Record<string, any> {
  id: string;
  name: string;
  affiliation: string;
  charactersIds: string[];
  tacticsIds: string[];
  crisisIds: string[];
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
  deploymentLetterToId: Record<string, string>;
}
