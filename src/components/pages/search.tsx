import { Divider, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CardTypeKey, cardTypeMeta, CardTypeMeta } from '../../data/card-type-meta';
import { CharacterCard, Card, McpDataType } from '../../service-models/card-models';
import { useApplicationContext } from '../../state/application-context';
import { Status } from '../../state/models';
import { getCardForDataType } from '../../utils/card-data-v2-';
import { CardSearchHeader } from '../card-search-header';
import { McpList } from '../list';
import { ModalCardContent } from '../modal-card-content';
import { PageHead } from '../page-head';


export const SearchPage = () => {
    const [state] = useApplicationContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [cardTypeFilter, setCardTypeFilter] = useState<CardTypeMeta>(cardTypeMeta.characters);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    const cards: string[] = state.cardLibraryStatus === Status.ready ? state[cardTypeFilter.dataKey]: [];
    
    const searchTermLower = searchTerm.toLowerCase();

    const filteredCards = cards.filter((cardId: string) => {
        const card = getCardForDataType(state, cardId, McpDataType.mcpData);
        return card.searchString.indexOf(searchTermLower) > -1
    });
    
    useEffect(() => {
        setSelectedCard(null);
    }, [cardTypeFilter]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <PageHead title="Search" />
            <CardSearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} >
                <Select
                    variant='standard'
                    value={cardTypeFilter.dataKey}
                    label="Card Type"
                    onChange={(e) => {
                        setCardTypeFilter(cardTypeMeta[e.target.value as CardTypeKey] as CardTypeMeta)
                        setSearchTerm('')
                    }}
                >
                    {Object.values(cardTypeMeta).map((cardTypeMeta) => (
                        <MenuItem value={cardTypeMeta.dataKey} key={cardTypeMeta.dataKey}>{cardTypeMeta.label}</MenuItem>
                    ))}

                </Select>
            </CardSearchHeader>

            <McpList cardType={cardTypeFilter.cardType} cards={filteredCards} selectCallback={(id: string) => setSelectedCard(id)}/>
    
            {selectedCard !== null && <ModalCardContent onClose={() => setSelectedCard(null)} cardType={cardTypeFilter.cardType} cardId={selectedCard} />}

        </div >
    )
};