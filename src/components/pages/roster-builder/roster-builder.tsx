import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { McpDataType } from '../../../service-models/card-models';
import { useApplicationContext } from '../../../state/application-context';
import { Page, Roster } from '../../../state/models';
import { PageHead } from '../../page-head';
import { Fab, List, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addRosterCardActionCreator, removeRosterCardActionCreator, saveRosterActionCreator, selectCardsAndKey, setPageActionCreator, setSelectedRosterActionCreator } from '../../../state/actions';
import { RosterBuilderSection } from './components';
import { CardFinder } from '../../card-finder';

const MAX_CHARACTERS = 10;
const MAX_TACTICS = 10;
const MAX_CRISIS = 3;

const idHashReducer = (agg: Record<string, {}>, id: string): Record<string, {}> => {
    agg[id] = {};
    return agg;
}

const selectCardsKey = (cardType: McpDataType): string => {
    switch (cardType) {
        case McpDataType.character:
            return 'charactersIds';
        case McpDataType.tactic:
            return 'tacticsIds';
        case McpDataType.crisis:
            return 'crisisIds';
    }

    return '';
}


export const RosterBuilder: React.FC = () => {
    const [characterPickerOpen, setCharacterPickerOpen] = useState(false);
    const [state, dispatch] = useApplicationContext();

    const currentRoster = useMemo<Roster | null>(() => state.rosterList.find((roster) => roster.id === state.rosterState.selectedRosterId) ?? null, [state.rosterState.selectedRosterId, state.rosterList]);
    const selectedIds = useMemo(() => {
        const selectedChars = currentRoster?.charactersIds.reduce(idHashReducer, {});
        const selectedTactics = currentRoster?.tacticsIds.reduce(idHashReducer, {});
        const selectedCrisis = currentRoster?.crisisIds.reduce(idHashReducer, {});

        const out = {
            ...selectedChars,
            ...selectedTactics,
            ...selectedCrisis
        };
        return out;
    }, [currentRoster]);

    const characterList = currentRoster?.charactersIds ?? [];
    const tacticsList = currentRoster?.tacticsIds ?? [];
    const crisisList = currentRoster?.crisisIds ?? [];

    const addRemoveIdFromList = useCallback((id: string, cardType: McpDataType) => {
        if (currentRoster === null) { return }

        const [ cardKey, relevantIds ] = selectCardsAndKey(cardType, currentRoster.charactersIds, currentRoster.tacticsIds, currentRoster.crisisIds)
        if (cardKey === '') { return }
        
        const isRemove = relevantIds.indexOf(id) >= 0;
        
        const actionProps = {
            rosterId: currentRoster.id,
            [cardKey]: [id],
            cardType,
            state
        };

        if (isRemove) {
            dispatch(removeRosterCardActionCreator(actionProps));
        } else {
            dispatch(addRosterCardActionCreator(actionProps));
        }
    }, [selectedIds]);

    useEffect(() => () => dispatch(saveRosterActionCreator({})), []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'stretch' }}>
            <PageHead title={currentRoster?.name ?? 'New Roster'} backCB={() => dispatch([setSelectedRosterActionCreator({ rosterId: null }), setPageActionCreator({ page: Page.roster })])} />

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{ maxHeight: '100%', overflow: 'scroll' }}
            >
                <RosterBuilderSection
                    title='Characters'
                    cardIds={characterList}
                    selectedIds={selectedIds}
                    cardType={McpDataType.character}
                    maxCount={MAX_CHARACTERS}
                    addRemoveIdFromList={addRemoveIdFromList}
                />

                <RosterBuilderSection
                    title='Tactics'
                    cardIds={tacticsList}
                    selectedIds={selectedIds}
                    cardType={McpDataType.tactic}
                    maxCount={MAX_TACTICS}
                    addRemoveIdFromList={addRemoveIdFromList}
                />
               
                <RosterBuilderSection
                    title='Crisis'
                    cardIds={crisisList}
                    selectedIds={selectedIds}
                    cardType={McpDataType.crisis}
                    maxCount={MAX_CRISIS}
                    addRemoveIdFromList={addRemoveIdFromList}
                />
            </List>


            <div style={{ position: 'absolute', right: '20px', bottom: '150px' }} onClick={() => setCharacterPickerOpen(true)}>
                <Fab color="primary" aria-label="add" >
                    <AddIcon />
                </Fab>
            </div>

            <Modal
                open={characterPickerOpen}
                onClose={() => null} hideBackdrop
                children={
                    <CardFinder
                        selectedItemsHash={selectedIds}
                        closeCB={() => setCharacterPickerOpen(false)}
                        cardTypes={[McpDataType.character, McpDataType.tactic, McpDataType.crisis]}
                        addRemoveCallback={addRemoveIdFromList}
                    />} />
        </div>
    );
}