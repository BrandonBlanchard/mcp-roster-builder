import React from 'react';

import { PageComingSoon } from '../page-coming-soon';
import { PageHead } from '../page-head';


export const RosterPage: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <PageHead title="Roster" />
            <PageComingSoon/>
        </div>
    );
};