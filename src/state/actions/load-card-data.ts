import { setCardLibStatusActionCreator } from ".";
import { CardDataV2, CrisisCard, McpData } from "../../service-models/card-models";
import { ApplicationDispatch } from "../application-context";
import { ApplicationState, Status } from "../models";

type DeploymentData = [ deploymentsByLetter: Record<string, string>, deploymentsById: Record<string, CrisisCard> ];

export interface LoadCardDataActionArgs {
    data?: CardDataV2 | null;
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
                const data = await fetch('https://crisis-bot.elindie.workers.dev/get-cards-v2');
                const json = await data.json() as CardDataV2;


                dispatch(loadCardDataActionCreator({ data: json, dispatch }))
                resolve(null);
            } catch (e) {
                dispatch(setCardLibStatusActionCreator({ status: Status.failed }));
                reject(e);
            }
        });

        return {
            ...state,
            cardLibraryStatus: Status.loading
        };
    }

    // Hash all the things
    const hashByIdReducer = (agg: [Record<string, McpData>, string[]], card: McpData): [Record<string, McpData>, string[]] => {
        agg[0][card.id] = card;
        agg[1].push(card.id);
        return agg;
    };

    const [characterHash, characterIds] = data.characters.reduce(hashByIdReducer, [{}, []]);
    const [crisisHash, crisisIds] = data.crisisCards.reduce(hashByIdReducer, [{}, []]);
    const [teamTactics, teamTacticIds] = data.teamTactics.reduce(hashByIdReducer, [{}, []]);
    const [infinityGems, gemIds] = data.gems.reduce(hashByIdReducer, [{}, []]);
    const [affiliations, affiliationIds] = data.affiliations.reduce(hashByIdReducer, [{}, []]);
    const [deploymentsByLetter, deploymentsById] = data.deployments.reduce(( agg: DeploymentData, deployment) => {
        agg[0][deployment.setup] = deployment.id;
        agg[1][deployment.id] = deployment;

        return agg;
    }, [{}, {}])

    const nextState: ApplicationState = {
        ...state,
        cardLibrary: data,
        mcpData: {
            ...characterHash,
            ...crisisHash,
            ...teamTactics,
            ...infinityGems,
            ...affiliations,
            ...deploymentsById
        },

        affiliations: affiliationIds,
        gems: gemIds,
        characters: characterIds,
        tactics: teamTacticIds,
        crisis: crisisIds,
        deploymentLetterToId: deploymentsByLetter,

        cardLibraryStatus: Status.ready
    };

    return nextState;
};