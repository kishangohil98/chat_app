import React from 'react';
import { Grid } from '@mui/material';
import { UserList } from './UserList';

export const Home = () => (
  <>
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <UserList />
      </Grid>
      <Grid item xs={9}>
        <div>Chat</div>
      </Grid>
    </Grid>
  </>
);
