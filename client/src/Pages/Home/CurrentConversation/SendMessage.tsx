import React from 'react';
import { Grid, Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import axiosInstance from '../../../Axios';

export const SendMessage = () => {
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik<{
    textMessage: string;
    groupId: string;
  }>({
    initialValues: {
      textMessage: '',
      groupId: '',
    },
    onSubmit: async (valuesOnSubmit) => {
      try {
        console.log(valuesOnSubmit);
      } catch (error) {
        console.error('Error', error);
      }
    },
  });
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container flexDirection="row" sx={{ p: 1 }}>
        <Grid item flexGrow="1">
          <TextField
            id="textMessage"
            type="text"
            fullWidth
            size="small"
            value={values.textMessage}
            onChange={handleChange}
            onBlur={handleBlur}
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
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
