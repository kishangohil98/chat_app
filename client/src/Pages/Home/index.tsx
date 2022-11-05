import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { GroupList } from './GroupList';
import { useAppDispath, useAppSelector } from '../../Store/hooks';
import { fetchNewGroups } from '../../Store/services/newGroups';
import { Index as CurrentConversation } from './CurrentConversation/Index';

export function Home() {
  const dispatch = useAppDispath();
  useEffect(() => {
    dispatch(fetchNewGroups());
  }, [dispatch]);
  // const newGroups = useAppSelector((state) => state.newGroups);

  return (
    <Grid
      container
      spacing={0}
      height="100%"
      style={{
        height: 'calc(100vh - 64px)',
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          borderRight: '0.5px solid',
          borderColor: 'divider',
        }}
      >
        <GroupList />
      </Grid>
      <Grid item xs={9}>
        <CurrentConversation />
      </Grid>
    </Grid>
  );
}
