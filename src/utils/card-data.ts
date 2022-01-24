import { CardTypeMeta } from "../data/card-type-meta";
import { CharacterCard, CrisisCard, Card, TeamTacticsCard } from "../service-models/card-models";

export interface TitleSubtitleProps { title: string; subtitle: string; };
const getCharacterTitleSubtitle = (character: CharacterCard): TitleSubtitleProps => ({
    title: character.name,
    subtitle: character.alias
});

const getCrisisCardTitleSubtitle = (card: CrisisCard): TitleSubtitleProps => ({
    title: card.crisis,
    subtitle: 'setup ' + card.setup
});

const getTacticsTitleSubtitle = (card: TeamTacticsCard): TitleSubtitleProps => ({
    title: card.tactic,
    subtitle: card.affiliations.join(', ')
});

export const getCardTitleSubtitle = (meta: CardTypeMeta, card: Card): TitleSubtitleProps => {
    switch (meta.dataKey) {
        case 'characters':
            return getCharacterTitleSubtitle(card as CharacterCard);
        case 'crisisCards':
            return getCrisisCardTitleSubtitle(card as CrisisCard);
        case 'teamTactics':
            return getTacticsTitleSubtitle(card as TeamTacticsCard);
    }
}

export interface CardImage {
    label: string;
    imageUrl: string;
}

const getCharacterImages = (character: CharacterCard): CardImage[] => ([
    { label: 'Healthy', imageUrl: character.healthy },
    { label: 'Injured', imageUrl: character.injured }
]);

const getCrisisCardImage = (card: CrisisCard): CardImage[] => ([{ label: card.crisis, imageUrl: card.card}]);

const getTacticsImage = (card: TeamTacticsCard): CardImage[] => ([{ label: card.tactic, imageUrl: card.card}]);

export const getCardImages = (meta: CardTypeMeta, card: Card): CardImage[] => {
    switch (meta.dataKey) {
        case 'characters':
            return getCharacterImages(card as CharacterCard);
        case 'crisisCards':
            return getCrisisCardImage(card as CrisisCard);
        case 'teamTactics':
            return getTacticsImage(card as TeamTacticsCard);
    }
}

