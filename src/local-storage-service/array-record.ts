export type ArrayRecordKey = 'roster'


export const getArrayRecord = <T>(key: ArrayRecordKey): T[] => {
    const storedData = window.localStorage.getItem(key);
    
    if(storedData === null) {
        return [];
    }

    const decoded = JSON.parse(storedData);

    return decoded as unknown as T[];
};

export const setArrayRecord = <T>(key: ArrayRecordKey, data: T[]) => {
    const dataString = JSON.stringify(data);
    
    window.localStorage.setItem(key, dataString);
}