import React from 'react';
import { McpData, McpDataType } from '../service-models/card-models';
import { useApplicationContext } from '../state/application-context';
import { getCardForDataType } from '../utils/card-data-v2-';



export const useMcpData = (id: string, dataType: McpDataType): McpData => {
    const [applicationState] = useApplicationContext();
    const cardData = getCardForDataType(applicationState, id, dataType);
    
    return cardData;
};

