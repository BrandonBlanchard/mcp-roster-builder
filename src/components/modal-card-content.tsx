import { AppBar, Button, ButtonGroup, Container, Divider, Paper, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { CardTypeMeta } from '../data/card-type-meta';
import { Card } from '../service-models/card-models';
import { getCardImages, CardImage } from '../utils/card-data';
import 'react-image-lightbox/style.css';

interface ModalCardContentProps {
    card: Card;
    meta: CardTypeMeta;
    onClose: () => void;
}

export const ModalCardContent: React.FC<ModalCardContentProps> = ({ card, meta, onClose }) => {
    const [cardImages, setCardImages] = useState<CardImage[]>([]);
    const [modalImageIndex, setModalImageIndex] = useState<number>(0);

    useEffect(() => {
        const cardImages = getCardImages(meta, card);
        setCardImages(cardImages)
    }, [card, meta])

    if (cardImages.length < 1) {
        return null;
    }

    return (
        <Lightbox
            mainSrc={cardImages[modalImageIndex].imageUrl}
            nextSrc={cardImages[(modalImageIndex + 1) % cardImages.length].imageUrl}
            prevSrc={cardImages[(modalImageIndex + cardImages.length - 1) % cardImages.length].imageUrl}
            onCloseRequest={() => {
                onClose();
                setModalImageIndex(0);
            }}
            onMovePrevRequest={() => setModalImageIndex((modalImageIndex + cardImages.length - 1) % cardImages.length)}
            onMoveNextRequest={() =>
                setModalImageIndex((modalImageIndex + 1) % cardImages.length)
            }
        />
    )
}