import React, { useState } from 'react';
import {
  Avatar,
  Divider,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const SendMessage = () => {
  const [first, setFirst] = useState();
  return (
    <Grid container flexDirection="row" sx={{ p: 1 }}>
      <Grid item flexGrow="1">
        <TextField
          id="time"
          type="text"
          fullWidth
          size="small"
          placeholder="Send message"
          sx={{
            width: '100%',
          }}
        />
      </Grid>
      <Grid
        sx={{
          ml: 1,
        }}
        item
      >
        <IconButton color="primary">
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
