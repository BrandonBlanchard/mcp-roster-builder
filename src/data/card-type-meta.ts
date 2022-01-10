export type CardTypeKey = 'characters' | 'crisisCards' | 'teamTactics';

export interface CardTypeMeta {
    label: string;
    dataKey: CardTypeKey
}

export const cardTypeMeta: Record<CardTypeKey, CardTypeMeta> = {
    'characters': {
        label: 'Characters',
        dataKey: 'characters'
    },
    'crisisCards': {
        label: 'Crisis Cards',
        dataKey: 'crisisCards'
    },
    'teamTactics': {
        label: 'Team Tactics',
        dataKey: 'teamTactics'
    }

};