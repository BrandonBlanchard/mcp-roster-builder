import React from 'react';

import { PageComingSoon } from '../page-coming-soon';
import { PageHead } from '../page-head';


export const PlayPage: React.FC = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <PageHead title="Play" />
            <PageComingSoon/>
        </div>
    );
};