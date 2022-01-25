import { ListItemText } from '@mui/material';
import React from 'react';
import { TeamTacticsCard } from '../../../service-models/card-models';

export interface McpListItemTacticContentProps {
    card: TeamTacticsCard;
}

export const McpListItemTacticContent: React.FC<McpListItemTacticContentProps> = ({ card }) => (
    <>
        <ListItemText primary={card.tactic} />
    </>
);