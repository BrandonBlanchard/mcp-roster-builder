import { ListItemText } from '@mui/material';
import React from 'react';
import { Affiliation } from '../../../service-models/card-models';

export interface McpListItemAffiliationContentProps {
  card: Affiliation;
}

export const McpListItemAffiliationContent: React.FC<
  McpListItemAffiliationContentProps
> = ({ card }) => (
  <ListItemText primary={card.name} secondary={card.leaders.join(',')} />
);
