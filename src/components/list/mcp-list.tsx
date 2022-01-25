import { List } from '@mui/material';
import React from 'react';
import { McpListItem } from '.';
import { McpDataType } from '../../service-models/card-models';

interface McpListProps {
    cards: string[];
    cardType: McpDataType;
    selectCallback(id: string): void;
}

export const McpList: React.FC<McpListProps> = ({ cards, cardType, selectCallback }) => {
    return (
        <List sx={{ bgcolor: 'background.paper', overflow: 'scroll', width: '100%' }}>
            {cards.map((cardId) => <McpListItem key={cardId} cardId={cardId} cardType={cardType} selectCallback={selectCallback} />)}
        </List>
    );
};