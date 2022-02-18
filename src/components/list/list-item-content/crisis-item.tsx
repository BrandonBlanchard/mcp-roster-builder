import { ListItemText } from '@mui/material';
import React from 'react';
import { CrisisCard } from '../../../service-models/card-models';

export interface McpListItemCrisisContentProps {
  card: CrisisCard;
}

export const McpListItemCrisisContent: React.FC<
  McpListItemCrisisContentProps
> = ({ card }) => (
  <>
    <ListItemText
      primary={card.crisis}
      secondary={`Deployment ${card.setup}`}
    />
    <ListItemText style={{ textAlign: 'right' }} primary={card.threatLevel} />
  </>
);
