import { useEffect } from 'react';
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
import { useAppDispath, useAppSelector } from '../../Store/hooks';
import { getGroup } from '../../Store/slices/groupsSlice';
import { fetchGroups } from '../../Store/services/groups';

const ListBox = styled(Box)<BoxProps>(() => ({
  // TODO: Below is the patch, think about some other way to use 100% height for the div
  height: 'calc(100vh - 64px)',
}));

function ListComponent() {
  const dispatch = useAppDispath();
  const groupState = useAppSelector(getGroup);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  console.log('getGroup', groupState);
  return (
    <ListBox>
      <PerfectScrollbar>
        <List sx={{ p: 0 }}>
          {groupState.groupData.map((data) => {
            const user = 'test';
            return (
              <div key={data._id}>
                <Divider variant="fullWidth" component="li" />
                <ListItem disablePadding>
                  <ListItemButton alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="" />
                    </ListItemAvatar>
                    <ListItemText primary="Test" secondary="Ali Connors dummy text" />
                  </ListItemButton>
                </ListItem>
              </div>
            );
          })}
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText primary="Test" secondary="Ali Connors dummy text" />
            </ListItemButton>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="" />
              </ListItemAvatar>
              <ListItemText primary="Test" secondary="Ali Connors dummy text" />
            </ListItemButton>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </List>
      </PerfectScrollbar>
    </ListBox>
  );
}

export function GroupList() {
  return (
    <Box
      sx={{
        borderRight: '0.5px solid',
        borderColor: 'divider',
      }}
    >
      <SearchComponent />
      <ListComponent />
    </Box>
  );
}
