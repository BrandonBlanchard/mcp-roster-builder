import { Card, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface LoadingBoxProps {
    label: string;
}

export const LoadingBox: React.FC<LoadingBoxProps> = ({ label }) => (
    <Card style={{ marginTop: '10px' }} >
        <CircularProgress color="secondary" />
        <Typography variant='h6'>{label}</Typography>
    </Card>
);