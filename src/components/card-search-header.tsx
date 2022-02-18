import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface CardSearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CardSearchHeader: React.FC<CardSearchHeaderProps> = ({
  setSearchTerm,
  searchTerm,
  children,
}) => (
  <div
    style={{
      marginLeft: 10,
      marginRight: 10,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {children}
    <FormControl style={{ marginTop: 10 }}>
      <InputLabel id="card-type">Search</InputLabel>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="input-with-icon-adornment"
        startAdornment={(
          <InputAdornment position="start">
            <Button disabled>
              <SearchIcon />
            </Button>
          </InputAdornment>
        )}
        endAdornment={(
          <InputAdornment position="start">
            <Button onClick={() => setSearchTerm('')}>
              <CloseIcon />
            </Button>
          </InputAdornment>
        )}
      />
    </FormControl>
  </div>
);
