'use client';
import React from 'react';
import { Alert, Snackbar, Button, Box } from '@mui/material';

const ResponsiveAlert = ({ open, setAlertOpen, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Duration to automatically hide the alert
      onClose={()=>setAlertOpen(false)}
      action={
        <Button color="inherit" onClick={()=>setAlertOpen(false)}>
          Close
        </Button>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the alert
      sx={{
        width: { xs: '90%', sm: '80%', md: '50%' }, // Responsive width
        '& .MuiAlert-root': {
          borderRadius: '8px',
          padding: 2,
          fontSize: { xs: '0.875rem', sm: '1rem' }, // Responsive font size
          maxWidth: '100%',
        },
      }}
    >
      <Alert
        onClose={()=>setAlertOpen(false)}
        severity="success"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ResponsiveAlert;