import { ApplicationState, Status } from '../models';

export interface SetCardLibStatusActionArgs {
  status: Status;
}

export interface SetCardLibStatusAction {
  type: 'setCardLibStatusAction';
  data: SetCardLibStatusActionArgs;
}

export const setCardLibStatusActionCreator = (
  data: SetCardLibStatusActionArgs,
): SetCardLibStatusAction => ({
  type: 'setCardLibStatusAction',
  data,
});

export const setCardLibStatusReducer = (
  state: ApplicationState,
  { status }: SetCardLibStatusActionArgs,
): ApplicationState => {
  const nextState = {
    ...state,
    cardLibraryStatus: status,
  };

  return nextState;
};
