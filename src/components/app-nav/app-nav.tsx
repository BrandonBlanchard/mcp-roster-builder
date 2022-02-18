import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import { setPageActionCreator } from '../../state/actions';
import { useApplicationContext } from '../../state/application-context';
import { Page, Status } from '../../state/models';
import './app-nav.css';

export const AppNev = () => {
  const [state, dispatch] = useApplicationContext();

  const waitForData = state.cardLibraryStatus !== Status.ready;
  return (
    <BottomNavigation
      showLabels
      value={state.page}
      onChange={(event, value: Page) => dispatch(setPageActionCreator({ page: value }))}
      style={{ paddingBottom: '20px' }}
    >
      <BottomNavigationAction
        label="Home"
        value={Page.home}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Search"
        disabled={waitForData}
        value={Page.search}
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Roster"
        disabled={waitForData}
        value={Page.roster}
        icon={<FormatListBulletedIcon />}
      />
      <BottomNavigationAction
        label="Play"
        disabled={waitForData}
        value={Page.play}
        icon={<PlayArrowIcon />}
      />
    </BottomNavigation>
  );
};
