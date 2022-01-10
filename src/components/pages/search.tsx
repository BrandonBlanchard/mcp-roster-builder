import { List, ListItemButton, ListItemText, MenuItem, Modal, Select } from '@mui/material';
import React, { useState } from 'react';
import { CardTypeKey, cardTypeMeta, CardTypeMeta } from '../../data/card-type-meta';
import { McpCard } from '../../service-models/card-models';
import { useApplicationContext } from '../../state/application-context';
import { getCardTitleSubtitle } from '../../utils/card-data';
import { CardSearchHeader } from '../card-search-header';
import { ModalCardContent } from '../modal-card-content';
import { PageHead } from '../page-head';


export const SearchPage = () => {
    const [state] = useApplicationContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [cardTypeFilter, setCardTypeFilter] = useState<CardTypeMeta>(cardTypeMeta.characters);
    const [selectedCard, setSelectedCard] = useState<McpCard | null>(null);
    const cards: McpCard[] = state.cardLibrary ? state.cardLibrary[cardTypeFilter.dataKey] : [];
    const searchTermLower = searchTerm.toLowerCase();
    const filteredCards = cards.filter((card: McpCard) => card.searchString.indexOf(searchTermLower) > -1);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <PageHead title="Search"/>
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

            <List sx={{ bgcolor: 'background.paper', overflow: 'scroll', width: '100%' }}>
                {filteredCards.map((card, i) => {
                    const { title, subtitle } = getCardTitleSubtitle(cardTypeFilter, card);

                    return (
                        <ListItemButton key={`${title}_${i}`} onClick={() => setSelectedCard(card)}>
                            <ListItemText primary={title} secondary={subtitle} />
                        </ListItemButton>
                    )
                })}
            </List>

            {selectedCard !== null && <ModalCardContent onClose={() => setSelectedCard(null)} card={selectedCard} meta={cardTypeFilter} />}

        </div>
    )
};