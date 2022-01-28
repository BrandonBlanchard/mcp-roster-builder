import React from 'react';
import './app-head.css';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export interface PageHeadProps {
    title: string;
    subtitle?: string;
}

export const PageHead: React.FC<PageHeadProps> = ({ title, subtitle = null }) => {

    return (
        <Container style={{ textAlign: 'left'}}>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginTop: '30px', marginBottom: '20px' }}> {title} </Typography>
            { subtitle !== null && <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginTop: '40px', marginBottom: '10px' }}> { subtitle} </Typography>}
        </Container>

    )
}