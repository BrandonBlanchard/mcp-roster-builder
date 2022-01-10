import { ApplicationState, Page } from "../models";

export interface SetPageActionArgs {
    page: Page;
};

export interface SetPageAction {
    type: 'setPageAction';
    data: SetPageActionArgs;
};

export const setPageActionCreator = (data: SetPageActionArgs): SetPageAction => ({
    type: 'setPageAction',
    data
});

export const setPageReducer = (state: ApplicationState, { page }: SetPageActionArgs): ApplicationState => {
    const nextState = {
        ...state,
        page,
    };

    return nextState;
};