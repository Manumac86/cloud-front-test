import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export default function ErrorAlert({ error, open, onClose }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
            open={open} 
            autoHideDuration={3000} 
            onClose={onClose}
        >
            <Alert onClose={onClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}