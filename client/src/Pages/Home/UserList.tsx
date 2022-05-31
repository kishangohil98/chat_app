import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  List,
  ListItemButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  ListItemText,
  Divider,
  BoxProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SearchComponent } from './Search';

export const UserList = () => {
  return (
    <>
      <Box
        sx={{
          borderRight: '0.5px solid',
          borderColor: 'divider',
        }}
      >
        <SearchComponent />
        <ListComponent />
      </Box>
    </>
  );
};

const ListBox = styled(Box)<BoxProps>(({ theme }) => ({
  // TODO: Below is the patch, think about some other way to use 100% height for the div
  height: 'calc(100vh - 64px)',
}));

const ListComponent = () => {
  return (
    <>
      <ListBox>
        <PerfectScrollbar>
          <List sx={{ p: 0 }}>
            <Divider variant="fullWidth" component="li" />
            <ListItem disablePadding>
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText primary="Remy Sharp" secondary="Ali Connors dummy text" />
              </ListItemButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem disablePadding>
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText primary="Remy Sharp" secondary="Ali Connors dummy text" />
              </ListItemButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
            <ListItem disablePadding>
              <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText primary="Remy Sharp" secondary="Ali Connors dummy text" />
              </ListItemButton>
            </ListItem>
            <Divider variant="fullWidth" component="li" />
          </List>
        </PerfectScrollbar>
      </ListBox>
    </>
  );
};
