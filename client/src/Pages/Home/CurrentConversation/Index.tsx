import { Avatar, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Loading } from '../../../Store/common';
import { useAppDispath, useAppSelector } from '../../../Store/hooks';

export const Index = () => {
  const dispatch = useAppDispath();
  const currentConversation = useAppSelector((state) => state.currentConversation);

  if (currentConversation.loading === Loading.Pending) {
    return <>loading</>;
  }
  if (currentConversation.loading === Loading.Idle) {
    return null;
  }

  return (
    <div>
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
      <Divider />
    </div>
  );
};
