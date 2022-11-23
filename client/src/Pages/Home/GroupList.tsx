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
import { getUser } from '../../Store/slices/userSlice';
import { changeCurrentGroup } from '../../Store/slices/currentConversationSlice';

function ListComponent() {
  const dispatch = useAppDispath();
  const groupState = useAppSelector(getGroup);
  const userData = useAppSelector(getUser);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  if (!userData) {
    return null;
  }

  return (
    <Box
      style={{
        height: 'calc(100vh - 124px)',
      }}
    >
      <PerfectScrollbar>
        <List sx={{ p: 0 }}>
          {groupState.groupData.map((data) => {
            // NOTE: Below condition is only for DM chat list, need to update for group chat type
            const chatUser = data.users.filter((user) => user._id !== userData._id)[0];

            return (
              <div key={data._id}>
                <Divider variant="fullWidth" component="li" />
                <ListItem disablePadding onClick={() => dispatch(changeCurrentGroup(data))}>
                  <ListItemButton alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${chatUser.firstName} ${chatUser.lastName}`}
                      secondary={chatUser.email}
                    />
                  </ListItemButton>
                </ListItem>
              </div>
            );
          })}
          <Divider variant="fullWidth" component="li" />
        </List>
      </PerfectScrollbar>
    </Box>
  );
}

export function GroupList() {
  return (
    <Box>
      <SearchComponent />
      <ListComponent />
    </Box>
  );
}
