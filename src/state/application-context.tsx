import React, { ReactElement, useContext, useReducer } from 'react';
import { applicationContextHandler } from './action-handler';
import { ApplicationAction } from './actions';
import { ApplicationState, Page, Status } from './models';

export const applicationContextDefault: ApplicationState = {
  page: Page.home,
  cardLibrary: null,
  cardLibraryStatus: Status.init,
  rosterList: [],
  rosterState: {
    selectedRosterId: null
  },
  mcpData: {},
  affiliations: [],
  gems: [],
  characters: [],
  tactics: [],
  crisis: [],
  deploymentLetterToId: {}
};

// Create context add placeholder dispatch
export type ApplicationDispatch = React.Dispatch<ApplicationAction | ApplicationAction[]>;
export const ApplicationContext = React.createContext<[ApplicationState, ApplicationDispatch]>([applicationContextDefault, (state) => state]);

interface ApplicationProviderArgs {
  children: ReactElement,
  reducer?: (state: ApplicationState, action: ApplicationAction | ApplicationAction[]) => ApplicationState,
  initialState?: ApplicationState
}

export const ApplicationProvider: React.FC<ApplicationProviderArgs> = ({
  reducer = applicationContextHandler,
  children = null,
  initialState = applicationContextDefault
}) => {
  const context = useReducer(reducer, initialState);

  return (
    <ApplicationContext.Provider value={context}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () => useContext(ApplicationContext);