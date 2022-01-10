export interface CharacterCard {
    name: string;
    threatLevel: string;
    alias: string;
    affiliations: string[];
    cp: string;
    healthy: string;
    injured: string;
    searchString: string;
  }
  
  export interface CrisisCard {
    crisis: string;
    threatLevel: string;
    setup: string;
    type: string;
    cp: string;
    card: string;
    searchString: string;
  }
  
  export interface TeamTacticsCard {
    tactic: string;
    affiliations: string[];
    characters: string;
    cp: string;
    card: string;
    searchString: string;
  }
  
export type McpCard = TeamTacticsCard | CrisisCard | CharacterCard;

  export interface CardData {
    created: Date;
    characters: CharacterCard[];
    crisisCards: CrisisCard[];
    teamTactics: TeamTacticsCard[];
  }