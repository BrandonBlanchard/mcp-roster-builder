import { CardData } from "../service-models/card-models";

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

export interface ApplicationState {
  page: Page;
  cardLibrary: CardData | null;
  cardLibraryStatus: Status;
};