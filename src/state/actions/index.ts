import { LoadCardDataAction } from './load-card-data';
import { LoadRosterAction } from './load-roster';
import { CreateRosterAction } from './roster-create';
import { DeleteRosterAction } from './roster-delete';
import { UpdateRosterAction } from './roster-update';
import { SaveRosterAction } from './save-roster';
import { SetCardLibStatusAction } from './set-card-lib-status';
import { SetPageAction } from './set-page';
import { SetSelectedRosterAction } from './set-selected-roster';

export * from './set-page';
export * from './load-card-data';
export * from './set-card-lib-status';
export * from './load-roster';
export * from './save-roster';
export * from './roster-create';
export * from './roster-delete';
export * from './roster-update';
export * from './set-selected-roster';
export * from './roster-add-card';
export * from './roster-remove-card';

export type ApplicationAction =
  | SetPageAction
  | LoadCardDataAction
  | SetCardLibStatusAction
  | LoadRosterAction
  | LoadRosterAction
  | SaveRosterAction
  | CreateRosterAction
  | DeleteRosterAction
  | UpdateRosterAction
  | SetSelectedRosterAction;
