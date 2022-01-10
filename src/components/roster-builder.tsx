import React, { useEffect } from 'react';
import { loadCardDataActionCreator } from '../state/actions';
import { useApplicationContext } from '../state/application-context';
import { Page, Status } from '../state/models';
import { AppNev as AppNav } from './app-nav';
import { PlayPage, RosterPage, SearchPage } from './pages';
import { HomePage } from './pages/home';
import './roster-builder.css';

export const RosterBuilder: React.FC = () => {
    const [state, dispatch] = useApplicationContext();

    useEffect(() => {
        if (state.cardLibrary === null || state.cardLibraryStatus === Status.failed) {
            dispatch(loadCardDataActionCreator({ dispatch }));
        }
    }, [state.cardLibraryStatus]);

    return (
        <div className='roster-builder'>
          
            <div className='app-content'>
                {state.page === Page.home && <HomePage />}
                {state.page === Page.search && <SearchPage />}
                {state.page === Page.roster && <RosterPage />}
                {state.page === Page.play && <PlayPage />}
            </div>
            <AppNav />
            <div className='roster-builder__background' />
        </div>
    );
}