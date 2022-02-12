import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import {
  CharacterCard, CrisisCard, McpData, McpDataType, TeamTacticsCard,
} from '../service-models/card-models';
import 'react-image-lightbox/style.css';
import { useMcpData } from '../hooks/mcp-data-hook';
import { useApplicationContext } from '../state/application-context';
import { ApplicationState } from '../state/models';
import { defaultMcpData, getCardForDataType } from '../utils/card-data-v2-';

interface ModalCardContentProps {
    cardId: string;
    cardType: McpDataType;
    onClose: () => void;
}

export interface CardImage {
    label: string;
    imageUrl: string;
}

const getCharacterImages = (character: CharacterCard): CardImage[] => ([
  { label: 'Healthy', imageUrl: character.healthy },
  { label: 'Injured', imageUrl: character.injured },
]);

const getCardImages = (state: ApplicationState, card: McpData, cardType: McpDataType): CardImage[] => {
  if (cardType === McpDataType.crisis) {
    const deploymentLetter = (card as CrisisCard).setup ?? '';
    const deploymentCardKey = state.deploymentLetterToId[deploymentLetter] ?? null;
    const deploymentCard = getCardForDataType(state, deploymentCardKey, McpDataType.crisis) as CrisisCard;

    if (deploymentCard !== defaultMcpData) {
      return [
        { label: (card as CrisisCard).crisis, imageUrl: (card as CrisisCard).card },
        { label: deploymentCard.crisis, imageUrl: deploymentCard.card },
      ];
    }
  }

  if (cardType === McpDataType.character) {
    return getCharacterImages(card as CharacterCard);
  }

  if (cardType === McpDataType.tactic) {
    return [{ label: (card as TeamTacticsCard).tactic, imageUrl: (card as TeamTacticsCard).card }];
  }

  if (cardType === McpDataType.infinityGem) {
    // Need to fix data side
    // return [{ label: (card as InfinityGem).name, value: (card as InfinityGem).card }]
    return [];
  }

  return [];
};

export const ModalCardContent: React.FC<ModalCardContentProps> = ({ cardId, cardType, onClose }) => {
  const [state] = useApplicationContext();
  const [cardImages, setCardImages] = useState<CardImage[]>([]);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const card = useMcpData(cardId, cardType);

  useEffect(() => {
    const cardImages = getCardImages(state, card, cardType);
    setCardImages(cardImages);
  }, [cardId, cardType]);

  if (cardImages.length < 1) {
    return null;
  }

  const lightBoxPropsPart = cardImages.length > 1 ? {
    nextSrc: cardImages[(modalImageIndex + 1) % cardImages.length].imageUrl,
    prevSrc: cardImages[(modalImageIndex + cardImages.length - 1) % cardImages.length].imageUrl,
    onMovePrevRequest: () => setModalImageIndex((modalImageIndex + cardImages.length - 1) % cardImages.length),
    onMoveNextRequest: () => setModalImageIndex((modalImageIndex + 1) % cardImages.length),
  } : {};

  return (
    <Lightbox
      reactModalStyle={{ zIndex: 9999 }}
      {...lightBoxPropsPart}
      mainSrc={cardImages[modalImageIndex].imageUrl}
      onCloseRequest={() => {
        onClose();
        setModalImageIndex(0);
      }}
    />
  );
};
