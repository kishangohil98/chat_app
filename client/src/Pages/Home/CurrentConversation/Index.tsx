import { Avatar, Divider, Grid, Typography, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Loading } from '../../../Store/common';
import { useAppDispath, useAppSelector } from '../../../Store/hooks';
import { TopBar } from './TopBar';
import { SendMessage } from './SendMessage';
import { GroupType } from '../../../Models/Group';
import { getUser } from '../../../Store/slices/userSlice';

export const Index = () => {
  const dispatch = useAppDispath();
  const currentConversation = useAppSelector((state) => state.currentConversation);

  useEffect(() => {
    if (!currentConversation.currentGroup) {
      return;
    }
    if (currentConversation.currentGroup.type === GroupType.DM) {
      // fetch
    }
  }, [currentConversation.currentGroup]);

  if (!currentConversation.currentGroup) {
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
