import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { CurrentConversationState } from '../../../Store/slices/currentConversationSlice';

export const TopBar = ({
  currentConversation,
}: {
  currentConversation: CurrentConversationState;
}) => (
  <Grid
    container
    flexDirection="row"
    sx={{
      height: '50px',
      px: 2,
    }}
    alignItems="center"
  >
    <Grid item>
      <Avatar sx={{ width: 30, height: 30 }}>{currentConversation.user?.firstName[0]}</Avatar>
    </Grid>
    <Grid item>
      <Typography
        variant="subtitle1"
        sx={{
          pl: 1,
        }}
      >
        {currentConversation.user?.firstName} {currentConversation.user?.lastName}
      </Typography>
    </Grid>
  </Grid>
);
