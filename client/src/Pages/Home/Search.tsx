import React, { useEffect, useCallback } from 'react';
import { Button, ButtonProps, Box, Typography, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { JoinDmOrGroupModal } from './JoinDmOrGroupModal';

const StyledButton = styled(Button)<ButtonProps>(() => ({
  textTransform: 'none',
  width: '100%',
  border: '0.5px solid transparent',
  backgroundColor: grey[300],
  '&:hover': {
    backgroundColor: grey[200],
    border: `0.5px solid ${grey[500]}`,
  },
}));

export function SearchComponent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setOpen(!open);
      }
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              id="search-bar"
              size="small"
              fullWidth
              defaultValue=""
              placeholder="Search"
            />
          </Grid>
          <Grid item xs={4} component="div">
            <StyledButton variant="text" onClick={handleClickOpen}>
              Join
              <Typography
                component="span"
                sx={{
                  fontSize: '10px',
                  backgroundColor: 'common.white',
                  padding: '0 6px',
                  borderRadius: '6px',
                  marginLeft: '16px',
                }}
              >
                Ctrl + K
              </Typography>
            </StyledButton>
          </Grid>
        </Grid>
      </Box>

      <JoinDmOrGroupModal open={open} handleClose={handleClose} />
    </>
  );
}
