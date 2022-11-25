import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Message } from '../../../Models/Message';
import { Loading } from '../../../Store/common';
import { useAppSelector } from '../../../Store/hooks';

const MyMessage = ({ message }: { message: Message }) => (
  <>
    {/* <Grid
      sx={{
        my: 0.5,
      }}
    >
      <Grid
        item
        xs="auto"
        sx={{
          bgcolor: 'primary.light',
        }}
      >
        <Typography>{message.message}</Typography>
      </Grid>

      <Grid xs="auto" />
    </Grid> */}
    {/* <Box
      component="li"
      sx={{
        listStyle: 'none',
        position: 'relative',
        maxWidth: '100%',
      }}
    > */}
    <Box
      sx={{
        // marginLeft: 'auto',
        // marginRight: 0,
        // float: 'right',
        width: '100%',
        height: '40px',
        // display: 'inline-block',
        // maxWidth: '100%',
        position: 'relative',
        // width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          height: 'auto',
          right: 0,
          top: 0,
          bgcolor: 'primary.light',
        }}
      >
        <Typography
          sx={{
            // float: 'right',
            display: 'block',
          }}
        >
          {message.message}
        </Typography>
      </Box>
    </Box>
    {/* </Box> */}
  </>
);

export const Messages = () => {
  const { messages, messagesLoading } = useAppSelector((state) => state.currentConversation);

  if (messagesLoading === Loading.Pending) {
    return <>Loading...</>;
  }
  if (messagesLoading === Loading.Idle && !messages.length) {
    return <>No messages</>;
  }
  if (messagesLoading === Loading.Failed) {
    return <>Something is wrong!!!</>;
  }
  console.log(messages);
  return (
    <Box
      // component="ul"
      sx={{
        my: 0,
        p: 0,
        height: '100%',
      }}
    >
      {messages.map((message) => (
        <MyMessage message={message} />
      ))}
    </Box>
  );
};
