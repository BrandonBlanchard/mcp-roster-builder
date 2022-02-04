import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { CardTypeKey, cardTypeMeta, CardTypeMeta } from '../../data/card-type-meta';
import { useMcpData } from '../../hooks/mcp-data-hook';
import { Affiliation, McpDataType, UNAFFILIATED } from '../../service-models/card-models';
import { useApplicationContext } from '../../state/application-context';
import { Status } from '../../state/models';
import { getCardForDataType } from '../../utils/card-data-v2-';
import { CardSearchHeader } from '../card-search-header';
import { McpList } from '../list';
import { ModalCardContent } from '../modal-card-content';
import { PageHead } from '../page-head';

const filterCardTypeMetaData = (cardTypes: McpDataType[]): CardTypeMeta[] => {
    if(cardTypes.includes(McpDataType.mcpData)) { return Object.values(cardTypeMeta) };

    const filteredMetaData = Object.values(cardTypeMeta).filter((typeMeta) => cardTypes.indexOf(typeMeta.cardType) >= 0);

    return filteredMetaData;
}

interface CardFinderProps {
    cardTypes?: McpDataType[];
    closeCB: (cardIds: string[]) => void;
    addRemoveCallback?: (cardId: string, cardType: McpDataType) => void;
    selectedItemsHash?: Record<string, {}>;
}

export const CardFinder: React.FC<CardFinderProps> = ({ 
    cardTypes =  [McpDataType.mcpData],
    closeCB,
    addRemoveCallback,
    selectedItemsHash
}) => {
    const [state] = useApplicationContext();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const validCardTypes = useMemo(() => filterCardTypeMetaData(cardTypes), [cardTypes]);
    const [cardTypeFilter, setCardTypeFilter] = useState<CardTypeMeta>(validCardTypes[0]);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);

    // Affiliation filters for characters and team tactics
    const [affiliationSelection, setAffiliationSelection] = useState<string>(UNAFFILIATED);
    const selectedAffiliationData = useMcpData(affiliationSelection ?? '', McpDataType.affiliation) as Affiliation;
    const showAffiliationFilter = cardTypeFilter.cardType === McpDataType.character || cardTypeFilter.cardType === McpDataType.tactic;

    const cards: string[] = state.cardLibraryStatus === Status.ready ? state[cardTypeFilter.dataKey] : [];

    const affiliationCards = cardTypeFilter.cardType === McpDataType.character ? selectedAffiliationData?.characterIds ?? null : selectedAffiliationData?.teamTactics ?? null;
    const withAffiliationFilter =
        showAffiliationFilter && affiliationSelection !== UNAFFILIATED
            ? affiliationCards
            : cards;

    const searchTermLower = searchTerm.toLowerCase();

    const filteredCards = withAffiliationFilter.filter((cardId: string) => {
        const card = getCardForDataType(state, cardId, McpDataType.mcpData);
        return card.searchString.indexOf(searchTermLower) > -1
    });

    const sortedFilteredCards = filteredCards.sort((cardIda, cardIdb) => {
        if (cardIda > cardIdb) { return 1; }
        if (cardIda < cardIdb) { return -1; }
        return 0;
    });

    useEffect(() => {
        setSelectedCard(null);
    }, [cardTypeFilter]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'white', height: '100vh' }}>
            <PageHead title="Card Search" backCB={() => closeCB([]) } />

            <CardSearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} >
                <FormControl>
                    <InputLabel id="card-type">Card Type</InputLabel>
                    <Select
                        variant='standard'
                        value={cardTypeFilter.dataKey}
                        label="Card Type"
                        onChange={(e) => {
                            setCardTypeFilter(cardTypeMeta[e.target.value as CardTypeKey] as CardTypeMeta)
                            setSearchTerm('')
                        }}
                    >
                        {validCardTypes.map((cardTypeMeta) => (
                            <MenuItem value={cardTypeMeta.dataKey} key={cardTypeMeta.dataKey}>{cardTypeMeta.label}</MenuItem>
                        ))}

                    </Select>
                </FormControl>

                {showAffiliationFilter && (
                    <FormControl style={{ marginTop: 10 }}>
                        <InputLabel id="affiliation">Affiliation</InputLabel>
                        <Select
                            variant='standard'
                            value={affiliationSelection}
                            label="Card Type"
                            onChange={(e) => {
                                setAffiliationSelection(e.target.value)
                                setSearchTerm('')
                            }}
                        >
                            <MenuItem value={UNAFFILIATED} key={UNAFFILIATED}>All Affiliations</MenuItem>
                            {state.affiliations.map((id) => {
                                const affiliation = getCardForDataType(state, id, McpDataType.affiliation) as Affiliation;
                                return <MenuItem value={id} key={id}>{affiliation.name}</MenuItem>
                            })}

                        </Select>
                    </FormControl>)}
            </CardSearchHeader>

            <McpList cardType={cardTypeFilter.cardType} cards={sortedFilteredCards} selectCallback={(id: string) => setSelectedCard(id)} addRemoveCallback={addRemoveCallback} selectedItemsHash={selectedItemsHash} />

            {selectedCard !== null && <ModalCardContent onClose={() => setSelectedCard(null)} cardType={cardTypeFilter.cardType} cardId={selectedCard} />}
        </div >
    )
};