import { List } from '@mui/material';
import React from 'react';
import { McpListItem } from '.';
import { McpDataType } from '../../service-models/card-models';

interface McpListProps {
    cards: string[];
    cardType: McpDataType;
    selectCallback(id: string): void;
    addRemoveCallback?: (id:string, cardType: McpDataType) => void;
    selectedItemsHash?: Record<string, {}>;
}

export const McpList: React.FC<McpListProps> = ({
  cards, cardType, selectCallback, addRemoveCallback, selectedItemsHash,
}) => (
  <List sx={{ bgcolor: 'background.paper', overflow: 'scroll', width: '100%' }}>
    {cards.map((cardId) => <McpListItem key={cardId} cardId={cardId} cardType={cardType} selectCallback={selectCallback} addRemoveCallback={addRemoveCallback} selectedItemsHash={selectedItemsHash} />)}
  </List>
);
