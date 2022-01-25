import { ListItemText } from '@mui/material';
import React from 'react';
import { InfinityGem } from '../../../service-models/card-models';

export interface McpListItemGemContentProps {
    card: InfinityGem;
}

export const McpListItemGemContent: React.FC<McpListItemGemContentProps> = ({ card }) => (
    <>
        <ListItemText primary={card.name} />
        <ListItemText style={{ textAlign: 'right' }} primary={card.threatLevel} />
    </>
);