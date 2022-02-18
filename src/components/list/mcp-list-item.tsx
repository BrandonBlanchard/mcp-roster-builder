import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';
import React, { useMemo } from 'react';
import { useMcpData } from '../../hooks/mcp-data-hook';
import {
  Affiliation,
  CharacterCard,
  CrisisCard,
  InfinityGem,
  McpDataType,
  TeamTacticsCard
} from '../../service-models/card-models';
import {
  McpListItemAffiliationContent,
  McpListItemCharacterContent,
  McpListItemCrisisContent,
  McpListItemGemContent,
  McpListItemTacticContent
} from './list-item-content';

export interface McpListItemProps {
  cardId: string;
  cardType: McpDataType;
  selectCallback(id: string): void;
  addRemoveCallback?: (id: string, cardType: McpDataType) => void;
  selectedItemsHash?: Record<string, unknown>;
}

export const McpListItem: React.FC<McpListItemProps> = ({
  cardId,
  cardType,
  selectCallback = () => null,
  addRemoveCallback = null,
  selectedItemsHash = {},
}) => {
  const card = useMcpData(cardId, cardType);

  const useAddRemove = addRemoveCallback !== null;
  const isOnAddRemoveList = useMemo(() => {
    if (useAddRemove === false) {
      return false;
    }

    const result = selectedItemsHash[cardId] ?? null;

    return result !== null;
  }, [cardId, selectedItemsHash, useAddRemove]);

  return (
    <ListItem style={{ flexGrow: 1 }}>
      <ListItemButton
        onClick={() => selectCallback(card.id)}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {cardType === McpDataType.mcpData && <ListItemText primary={card.id} />}

        {cardType === McpDataType.character && (
          <McpListItemCharacterContent card={card as CharacterCard} />
        )}
        {cardType === McpDataType.crisis && (
          <McpListItemCrisisContent card={card as CrisisCard} />
        )}
        {cardType === McpDataType.tactic && (
          <McpListItemTacticContent card={card as TeamTacticsCard} />
        )}
        {cardType === McpDataType.infinityGem && (
          <McpListItemGemContent card={card as InfinityGem} />
        )}
        {cardType === McpDataType.affiliation && (
          <McpListItemAffiliationContent card={card as Affiliation} />
        )}
        {useAddRemove && (
          <IconButton onClick={() => addRemoveCallback(card.id, cardType)}>
            {isOnAddRemoveList === false && <AddCircleIcon />}
            {isOnAddRemoveList && <RemoveCircleIcon />}
          </IconButton>
        )}
      </ListItemButton>
    </ListItem>
  );
};
