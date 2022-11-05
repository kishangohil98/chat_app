import { Avatar, Divider, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import { Loading } from '../../../Store/common';
import { useAppDispath, useAppSelector } from '../../../Store/hooks';
import { TopBar } from './TopBar';
import { SendMessage } from './SendMessage';

export const Index = () => {
  const dispatch = useAppDispath();
  const currentConversation = useAppSelector((state) => state.currentConversation);

  if (currentConversation.loading === Loading.Pending) {
    return <>loading</>;
  }
  if (currentConversation.loading === Loading.Idle) {
    return <>Select current convresation</>;
  }

  return (
    <Grid height="100%" flexDirection="column" container>
      <Grid item>
        <TopBar currentConversation={currentConversation} />
        <Divider />
      </Grid>
      <Grid item flexGrow={1} />
      <Grid item>
        <SendMessage />
      </Grid>
    </Grid>
  );
};
