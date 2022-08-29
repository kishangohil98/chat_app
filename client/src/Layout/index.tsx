/* eslint-disable react/jsx-props-no-spreading */
import { Box } from '@mui/material';
import React from 'react';
import { Navbar } from './Navbar';

export function withLayout<P>(Component: React.ComponentType<P>) {
  return function returnComponent(props: P) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            pt: '64px',
          }}
        >
          <Component {...(props as P)} />
        </Box>
      </>
    );
  };
}
