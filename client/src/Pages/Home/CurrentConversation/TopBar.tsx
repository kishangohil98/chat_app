/* eslint-disable operator-linebreak */
import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { CurrentConversationState } from '../../../Store/slices/currentConversationSlice';
import { getUserFromDmGroup } from '../../../Models/Group';
import { useAppSelector } from '../../../Store/hooks';
import { getUser } from '../../../Store/slices/userSlice';

export const TopBar = ({
  currentConversation,
}: {
  currentConversation: CurrentConversationState;
}) => {
  const userData = useAppSelector(getUser);
  const otherUser =
    currentConversation.currentGroup && userData
      ? getUserFromDmGroup(currentConversation.currentGroup, userData)
      : null;
  return (
    <Grid
      container
      flexDirection="row"
      sx={{
        height: '50px',
        px: 2,
      }}
      alignItems="center"
    >
      {otherUser && (
        <>
          <Grid item>
            <Avatar sx={{ width: 30, height: 30 }}>{otherUser?.firstName[0]}</Avatar>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              sx={{
                pl: 1,
              }}
            >
              {otherUser?.firstName} {otherUser?.lastName}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
};
