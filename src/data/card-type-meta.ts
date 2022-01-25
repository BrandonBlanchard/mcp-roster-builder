import { McpDataType } from "../service-models/card-models";

export type CardTypeKey = 'characters' | 'crisis' | 'tactics' | 'gems';

export interface CardTypeMeta {
    label: string;
    dataKey: CardTypeKey;
    cardType: McpDataType
}

export const cardTypeMeta: Record<CardTypeKey, CardTypeMeta> = {
    'characters': {
        label: 'Characters',
        dataKey: 'characters',
        cardType: McpDataType.character
    },
    'crisis': {
        label: 'Crisis Cards',
        dataKey: 'crisis',
        cardType: McpDataType.crisis
    }, 
    'tactics': {
        label: 'Team Tactics',
        dataKey: 'tactics',
        cardType: McpDataType.tactic
    },
    'gems': {
        label: 'Infinity Gems',
        dataKey: 'gems',
        cardType: McpDataType.infinityGem
    }
};