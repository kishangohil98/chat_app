import React from 'react';
import { Grid } from '@mui/material';
import { GroupList } from './GroupList';

export function Home() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <GroupList />
      </Grid>
      <Grid item xs={9}>
        <div>Chat</div>
      </Grid>
    </Grid>
  );
}
