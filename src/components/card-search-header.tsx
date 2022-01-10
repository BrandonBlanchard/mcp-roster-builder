import { Button, FormControl, Input, InputAdornment } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close';

interface CardSearchHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const CardSearchHeader: React.FC<CardSearchHeaderProps> = ({ setSearchTerm, searchTerm, children }) => {


    return (
        <>
            {children}
            <FormControl variant="standard" style={{ marginTop: '5px' }}>
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="start" >
                            <Button onClick={() => setSearchTerm('')}>
                                <CloseIcon />
                            </Button>
                        </InputAdornment>
                    }

                />
            </FormControl>
        </>
    );
}