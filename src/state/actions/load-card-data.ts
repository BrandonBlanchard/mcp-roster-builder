import { setCardLibStatusActionCreator } from ".";
import { CardData } from "../../service-models/card-models";
import { ApplicationDispatch } from "../application-context";
import { ApplicationState, Page, Status } from "../models";

export interface LoadCardDataActionArgs {
    data?: CardData | null;
    dispatch: ApplicationDispatch
};

export interface LoadCardDataAction {
    type: 'loadCardDataAction';
    data: LoadCardDataActionArgs;
};

export const loadCardDataActionCreator = (data: LoadCardDataActionArgs): LoadCardDataAction => ({
    type: 'loadCardDataAction',
    data
});

export const loadCardDataReducer = (state: ApplicationState, { data = null, dispatch }: LoadCardDataActionArgs): ApplicationState => {
    if (data === null) {
        new Promise(async (resolve, reject) => {
            try {
                const data = await fetch('https://crisis-bot.elindie.workers.dev/get-cards');
                const json = await data.json() as CardData;
                
                
                dispatch(loadCardDataActionCreator({data: json, dispatch}))
                resolve(null);
            } catch (e) {
                dispatch(setCardLibStatusActionCreator({status: Status.failed}));
                reject(e);
            }
        });
        
        return {
            ...state,
            cardLibraryStatus: Status.loading
        };
    }

    const nextState = {
        ...state,
        cardLibrary: data,
        cardLibraryStatus: Status.ready
    };

    console.log(nextState);

    return nextState;
};