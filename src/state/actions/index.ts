import { LoadCardDataAction } from './load-card-data';
import { SetCardLibStatusAction } from './set-card-lib-status';
import { SetPageAction } from './set-page';

export * from './set-page';
export * from './load-card-data';
export * from './set-card-lib-status';


export type ApplicationAction = SetPageAction | LoadCardDataAction | SetCardLibStatusAction;