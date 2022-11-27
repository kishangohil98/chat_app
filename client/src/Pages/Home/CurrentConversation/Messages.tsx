import { Avatar, Box, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { Message } from '../../../Models/Message';
import { Loading } from '../../../Store/common';
import { useAppSelector } from '../../../Store/hooks';

const MyMessage = ({ message }: { message: Message }) => (
  <Box sx={{ ml: 5 }} className="message">
    <Box
      sx={{
        borderRadius: '6px',
        padding: '6px',
        backgroundColor: 'secondary.light',
        float: 'right',
        marginRight: 0,
        marginLeft: 'auto',
      }}
    >
      <Typography variant="body2">{message.message}</Typography>
    </Box>
  </Box>
);

const ResponseMessage = ({ message }: { message: Message }) => (
  <Box
    sx={{
      mr: 5,
    }}
    className="message"
  >
    <Box
      sx={{
        borderRadius: '6px',
        padding: '6px',
        backgroundColor: 'primary.dark',
        color: 'primary.contrastText',
      }}
    >
      <Typography variant="body2">{message.message}</Typography>
    </Box>
  </Box>
);

export const Messages = () => {
  const { messages, messagesLoading } = useAppSelector((state) => state.currentConversation);
  const { userData } = useAppSelector((state) => state.user);

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
      sx={{
        mx: 0.8,
        p: 0,
        height: '400px',
        // height: '100%',
        overflowY: 'scroll',
      }}
      className="chat-messages"
    >
      {messages.map((message) => (
        <div>
          {message.senderId === userData?._id ? (
            <MyMessage message={message} />
          ) : (
            <ResponseMessage message={message} />
          )}
        </div>
      ))}
    </Box>
  );
};
