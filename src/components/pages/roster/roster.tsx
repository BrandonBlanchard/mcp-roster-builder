import { Divider, Fab, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createRosterActionCreator, loadRosterActionCreator, saveRosterActionCreator, setSelectedRosterActionCreator } from '../../../state/actions';
import { useApplicationContext } from '../../../state/application-context';
import { PageHead } from '../../page-head';
import AddIcon from '@mui/icons-material/Add';
import { AddNewRoster } from './components/add-new-roster';
import { Roster } from '../../../state/models';

export const RosterPage: React.FC = () => {
    const [state, dispatch] = useApplicationContext();

    const [isCreatingNewRoster, setIsCreatingNewRoster] = useState<boolean>(false);

    useEffect(() => {
        dispatch(loadRosterActionCreator({}));

        const saveRoster = () => dispatch(saveRosterActionCreator({}));
        window.addEventListener("beforeunload", saveRoster);

        return () => {
            window.removeEventListener("beforeunload", saveRoster);
            saveRoster();
        }
    }, [])

    const createRosterCallback = (name: string) => {
        dispatch(createRosterActionCreator({ name }));
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignSelf: 'stretch' }}>
            <PageHead title="Roster" />


            <div style={{ position: 'absolute', right: '20px', bottom: '150px' }} onClick={() => setIsCreatingNewRoster(true)}>
                <Fab color="primary" aria-label="add" >
                    <AddIcon />
                </Fab>
            </div>

            <AddNewRoster isOpen={isCreatingNewRoster} onClose={() => setIsCreatingNewRoster(false)} addCallback={createRosterCallback} />

            <List sx={{ bgcolor: 'background.paper', overflow: 'scroll', width: '100%' }}>
                {state.rosterList.map((roster: Roster, i) => (
                    <ListItemButton key={roster.id} selected={roster.id === state.rosterState.selectedRosterId} onClick={() => dispatch(setSelectedRosterActionCreator({ rosterId: roster.id }))} style={{ display: "flex", justifyContent: "space-between" }}>
                        <ListItemText primary={roster.name} secondary={roster.affiliation} />
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};