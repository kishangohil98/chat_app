import React, { useState } from 'react';
import { Avatar, Divider, Grid, Typography, Box, TextField } from '@mui/material';

export const SendMessage = () => {
  const [first, setFirst] = useState();
  return (
    <Grid container flexDirection="row">
      <Grid item>
        <TextField
          id="time"
          type="text"
          sx={{
            width: '100%',
          }}
        />
      </Grid>
    </Grid>
  );
};
