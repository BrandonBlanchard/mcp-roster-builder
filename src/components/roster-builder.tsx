import React, { useEffect } from 'react';
import { loadCardDataActionCreator } from '../state/actions';
import { useApplicationContext } from '../state/application-context';
import { Page, Status } from '../state/models';
import { AppNev as AppNav } from './app-nav';
import { PlayPage, RosterPage, SearchPage } from './pages';
import { HomePage } from './pages/home';
import { RosterBuilder } from './pages/roster-builder';
import './roster-builder.css';

export const RosterBuilderApp: React.FC = () => {
    const [state, dispatch] = useApplicationContext();
    const { page } = state;

    useEffect(() => {
        if (state.cardLibrary === null || state.cardLibraryStatus === Status.failed) {
            dispatch(loadCardDataActionCreator({ dispatch }));
        }
    }, [state.cardLibraryStatus]);

    return (
        <div className='roster-builder'>
          
            <div className='app-content'>
                {page === Page.home && <HomePage />}
                {page === Page.search && <SearchPage />}
                {page === Page.roster && <RosterPage />}
                {page === Page.play && <PlayPage />}
                {page === Page.rosterBuilder && <RosterBuilder/>}
            </div>
            <AppNav />
            <div className='roster-builder__background' />
        </div>
    );
}