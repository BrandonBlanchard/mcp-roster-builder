import { Page } from '../state/models';

export interface PageMeta {
  label: string;
}

export const pageMeta: Record<Page, PageMeta> = {
  [Page.home]: {
    label: 'Home',
  },
  [Page.play]: {
    label: 'Play',
  },
  [Page.roster]: {
    label: 'Roster',
  },
  [Page.search]: {
    label: 'Search',
  },
  [Page.rosterBuilder]: {
    label: 'Roster Builder',
  },
};
