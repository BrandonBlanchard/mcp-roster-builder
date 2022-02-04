import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { McpDataType, UNAFFILIATED } from '../../../service-models/card-models';
import { useApplicationContext } from '../../../state/application-context';
import { Page, Roster } from '../../../state/models';
import { McpList } from '../../list';
import { PageHead } from '../../page-head';
import { Paper, Typography, Fab, Container, Divider, List, ListSubheader, ListItemIcon, ListItemButton, ListItemText, ListItem, MenuItem, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CardFinder } from '../../card-finder';
import { addRosterCardActionCreator, removeRosterCardActionCreator, saveRosterActionCreator, setPageActionCreator, setSelectedRosterActionCreator } from '../../../state/actions';

const MAX_CHARACTERS = 10;
const MAX_TACTICS = 5;

const idHashReducer = (agg: Record<string, {}>, id: string): Record<string, {}> => {
    agg[id] = {};
    return agg;
}

export const RosterBuilder: React.FC = () => {
    const [charactersExpanded, setCharactersExpanded] = useState(true);
    const [tacticsExpanded, setTacticsExpanded] = useState(true);
    const [characterPickerOpen, setCharacterPickerOpen] = useState(false);
    const [state, dispatch] = useApplicationContext();

    const currentRoster = useMemo<Roster | null>(() => state.rosterList.find((roster) => roster.id === state.rosterState.selectedRosterId) ?? null, [state.rosterState.selectedRosterId, state.rosterList]);
    const selectedIds = useMemo(() => {
        const selectedChars = currentRoster?.charactersIds.reduce(idHashReducer, {});
        const selectedTactics = currentRoster?.tacticsIds.reduce(idHashReducer, {});
        const out = {
            ...selectedChars,
            ...selectedTactics
        };
        return out;
    }, [currentRoster]);

    const characterList = currentRoster?.charactersIds ?? [];
    const tacticsList = currentRoster?.tacticsIds ?? [];

    const addRemoveIdFromList = useCallback((id: string, cardType: McpDataType) => {
        if (currentRoster === null) { return }

        const relevantIds =
            cardType === McpDataType.character
                ? currentRoster.charactersIds
                : cardType === McpDataType.tactic
                    ? currentRoster.tacticsIds
                    : null

        if (relevantIds === null) { return }

        const isRemove = relevantIds.indexOf(id) >= 0;
        const cardKey = cardType === McpDataType.character ? 'charactersIds' : 'tacticsIds';

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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'stretch'}}>
            <PageHead title={currentRoster?.name ?? 'New Roster'} backCB={() => dispatch([setSelectedRosterActionCreator({ rosterId: null }), setPageActionCreator({ page: Page.roster })])} />
            
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                style={{ maxHeight: '100%', overflow: 'scroll'}}
            >
                <ListItemButton onClick={() => setCharactersExpanded(!charactersExpanded)}>
                    <ListItemText primary={<Typography variant='h5' textAlign='left'> Characters {characterList.length} / {MAX_CHARACTERS} </Typography>} />
                    {charactersExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {charactersExpanded && characterList.length > 0 && <McpList cards={characterList} cardType={McpDataType.character} selectCallback={() => null} addRemoveCallback={addRemoveIdFromList} selectedItemsHash={selectedIds} />}
                {charactersExpanded && characterList.length === 0 && (
                    <ListItem>
                        <Typography variant='body1' textAlign='left'> empty </Typography>
                    </ListItem>
                )}

                <ListItemButton onClick={() => setTacticsExpanded(!tacticsExpanded)}>
                    <ListItemText primary={
                        <Typography variant='h5' textAlign='left'> Team Tactics {tacticsList.length} / {MAX_TACTICS} </Typography>} />
                    {tacticsExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                {tacticsExpanded && tacticsList.length > 0 && <McpList cards={tacticsList} cardType={McpDataType.tactic} selectCallback={() => null} addRemoveCallback={addRemoveIdFromList} selectedItemsHash={selectedIds} />}
                {tacticsExpanded && tacticsList.length === 0 && (
                    <ListItem>
                        <Typography variant='body1' textAlign='left'> empty </Typography>
                    </ListItem>
                )}
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
                        cardTypes={[McpDataType.character, McpDataType.tactic]}
                        addRemoveCallback={addRemoveIdFromList}
                    />} />
        </div>
    );
}