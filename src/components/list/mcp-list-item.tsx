import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { useMcpData } from '../../hooks/mcp-data-hook';
import { Affiliation, CharacterCard, CrisisCard, InfinityGem, McpDataType, TeamTacticsCard } from '../../service-models/card-models';
import { McpListItemAffiliationContent, McpListItemCharacterContent, McpListItemCrisisContent, McpListItemGemContent, McpListItemTacticContent } from './list-item-content';

export interface McpListItemProps {
    cardId: string;
    cardType: McpDataType;
    selectCallback(id: string): void;
}

export const McpListItem: React.FC<McpListItemProps> = ({
    cardId,
    cardType,
    selectCallback = () => null
}) => {
    const card = useMcpData(cardId, cardType);

    return (
        <ListItem>
            <ListItemButton onClick={() => selectCallback(card.id)} style={{ display: "flex", justifyContent: "space-between" }}>
                { cardType === McpDataType.mcpData && (<ListItemText primary={ card.id } />)}

                { cardType === McpDataType.character && (<McpListItemCharacterContent card={card as CharacterCard} />)}
                { cardType === McpDataType.crisis && (<McpListItemCrisisContent card={card as CrisisCard}  />)}
                { cardType === McpDataType.tactic && (<McpListItemTacticContent card={card as TeamTacticsCard}  />)}
                { cardType === McpDataType.infinityGem && (<McpListItemGemContent card={card as InfinityGem}  />)}
                { cardType === McpDataType.affiliation && (<McpListItemAffiliationContent card={card as Affiliation}  />)}
            </ListItemButton>
        </ListItem>
    );
}
