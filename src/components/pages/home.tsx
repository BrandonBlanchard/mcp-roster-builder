import {
  Chip, CircularProgress, Container, Typography
} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useApplicationContext } from '../../state/application-context';
import { Status } from '../../state/models';

export const HomePage: React.FC = () => {
  const [state] = useApplicationContext();

  const cardLibLoading = state.cardLibraryStatus !== Status.failed
    && state.cardLibraryStatus !== Status.ready;
  const cardLibReady = state.cardLibraryStatus === Status.ready;

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <Typography variant="h1" fontWeight="bold">
          MCP
        </Typography>
        <Typography variant="h5" fontWeight={1000}>
          Roster Builder
        </Typography>
      </div>

      <div>
        {cardLibLoading && (
          <Chip
            icon={<CircularProgress size={20} />}
            label="Loading Card Data.."
            color="warning"
          />
        )}
        {cardLibReady && (
          <Chip
            icon={<CheckIcon />}
            label="Card Data up to date."
            color="info"
          />
        )}
      </div>
    </Container>
  );
};
