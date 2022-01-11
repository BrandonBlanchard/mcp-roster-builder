import React, { useState } from 'react';

import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';

export interface AddNewRosterProps {
    isOpen: boolean;
    onClose: () => void;
    addCallback: (name: string) => void;
}

export const AddNewRoster: React.FC<AddNewRosterProps> = ({ isOpen, onClose, addCallback }) => {
    const [rosterName, setRosterName] = useState<string>('');

    const canSave = rosterName.length > 0;
    
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle title='Add New Roster' color='primary' >Create new Roster</DialogTitle>
            <DialogContent>
                <TextField
                    label='Roster Name'
                    id="filled-hidden-label-small"
                    defaultValue=""
                    variant="filled"
                    size="small"
                    onChange={(e) => setRosterName(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <Button onClick={onClose}> Cancel </Button>
                    <Button variant='contained' color='primary' onClick={() => {
                        if (canSave) {
                            addCallback(rosterName);
                            onClose();
                        }
                    }}
                    > Add </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};