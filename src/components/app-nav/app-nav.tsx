import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import './app-nav.css';
import { useApplicationContext } from '../../state/application-context';
import { setPageActionCreator } from '../../state/actions';
import { Page, Status } from '../../state/models';

export function AppNev() {
  const [state, dispatch] = useApplicationContext();

  const waitForData = state.cardLibraryStatus !== Status.ready;
  return (
    <BottomNavigation
      showLabels
      value={state.page}
      onChange={(event, value: Page) => dispatch(setPageActionCreator({ page: value }))}
      style={{ paddingBottom: '20px' }}
    >
      <BottomNavigationAction label="Home" value={Page.home} icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" disabled={waitForData} value={Page.search} icon={<SearchIcon />} />
      <BottomNavigationAction label="Roster" disabled={waitForData} value={Page.roster} icon={<FormatListBulletedIcon />} />
      <BottomNavigationAction label="Play" disabled={waitForData} value={Page.play} icon={<PlayArrowIcon />} />
    </BottomNavigation>
  );
}
