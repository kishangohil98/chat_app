import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { GroupList } from './GroupList';
import { useAppDispath, useAppSelector } from '../../Store/hooks';
import { fetchNewGroups } from '../../Store/services/newGroups';

export function Home() {
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(fetchNewGroups());
  }, [dispatch]);
  const newGroups = useAppSelector((state) => state.newGroups);

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
