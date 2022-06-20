import React, { useEffect, useCallback } from 'react';
import {
  Button,
  ButtonProps,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Grid,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

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
              Join DM
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
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Search for Users Or Groups
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quidem quam
            molestias sapiente ut nam, recusandae sed maxime nostrum error vel inventore excepturi
            vitae sunt atque, molestiae praesentium necessitatibus non.
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </>
  );
}
