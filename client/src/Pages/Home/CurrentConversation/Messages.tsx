import { Avatar, Box, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { Message } from '../../../Models/Message';
import { Loading } from '../../../Store/common';
import { useAppSelector } from '../../../Store/hooks';

const MyMessage = ({ message }: { message: Message }) => (
  <div className="message">
    <div className="message-container">
      <p className="text">{message.message}</p>
      <p className="response-time time"> c</p>
    </div>
  </div>
);

const ResponseMessage = ({ message }: { message: Message }) => (
  <div className="message">
    <div className="response-container">
      <p className="text">{message.message}</p>
      <p className="time"> time</p>
    </div>
  </div>
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
        my: 0,
        p: 0,
        height: '100%',
      }}
    >
      <div className="chat">
        <div className="messages-chat">
          {messages.map((message) => (
            <div>
              {message.senderId === userData?._id ? (
                <MyMessage message={message} />
              ) : (
                <ResponseMessage message={message} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};
