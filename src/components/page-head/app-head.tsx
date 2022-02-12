import React from 'react';
import './app-head.css';
import {
  Container, Divider, IconButton, Toolbar, Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export interface PageHeadProps {
  title: string;
  backCB?: () => void;
}

export const PageHead: React.FC<PageHeadProps> = ({ title, backCB = null }) => (
  <>
    <Container style={{
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      height: '60px',
      minHeight: '60px',
      alignItems: 'center',
    }}
    >
      <div style={{ width: '50px' }}>
        {backCB && (
          <IconButton onMouseDown={backCB}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
      </div>
      <Typography variant="overline" component="div">
        {title}
      </Typography>
      <div style={{ width: '50px' }} />

    </Container>
    <Divider style={{ width: '100%', marginBottom: '20px' }} />
  </>

);
