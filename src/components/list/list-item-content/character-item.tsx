import { ListItemText } from '@mui/material';
import React from 'react';
import { CharacterCard } from '../../../service-models/card-models';

export interface McpListItemCharacterContentProps {
  card: CharacterCard;
}

export const McpListItemCharacterContent: React.FC<
  McpListItemCharacterContentProps
> = ({ card }) => (
  <ListItemText
    primary={card.name}
    secondary={`${card.alias} (${card.threatLevel})`}
  />
);
