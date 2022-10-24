import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Tabs,
  Tab,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { Close, Done } from '@mui/icons-material';
import { TabPanel } from '../../Utils/CommonComponents/TabPanel';
import { useAppDispath, useAppSelector } from '../../Store/hooks';
import { NewGroupsState } from '../../Store/slices/newGroupsSlice';
import { fetchNewGroups, joinNewDM } from '../../Store/services/newGroups';
import { fetchGroupsAPI } from '../../Store/services/groups';
import { changeGroupData } from '../../Store/slices/groupsSlice';

const JoinDM = ({
  newChats,
  refreshNew,
  fetchGroupsData,
}: {
  newChats: NewGroupsState;
  refreshNew: () => void;
  fetchGroupsData: () => void;
}) => {
  const [loadingUserIds, setLoadingUserIds] = useState<string[]>([]);
  const [errorState, setErrorState] = useState<{ [key: string]: string | undefined }>({});
  const [joinedDmUserIds, setJoinedDmUserIds] = useState<string[]>([]);

  const joinDmApi = async (userId: string) => {
    try {
      setLoadingUserIds((pre) => [...pre, userId]);
      setErrorState((pre) => ({
        ...pre,
        [userId]: undefined,
      }));
      await joinNewDM(userId);
      setJoinedDmUserIds((pre) => [...pre, userId]);
      fetchGroupsData();
    } catch (error: any) {
      setErrorState((pre) => ({
        ...pre,
        [userId]: error?.response?.data?.[0]?.message ?? 'Something went wrong!',
      }));
    }
    setLoadingUserIds((pre) => pre.filter((id) => id !== userId));
  };
  useEffect(
    () => () => {
      refreshNew();
    },
    [],
  );

  return (
    <>
      {newChats.users.length === 0 && (
        <Box
          sx={{
            py: 5,
            pt: 8,
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
            }}
          >
            No new Users availabe to join!
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          mt: 2,
        }}
      >
        {newChats.users.map((user) => {
          const isLoading = loadingUserIds.includes(user._id);
          const errorText = errorState[user._id];
          const isJoined = joinedDmUserIds.includes(user._id);
          return (
            <div key={user._id}>
              <ListItem
                disablePadding
                secondaryAction={
                  isJoined ? (
                    <Chip
                      size="small"
                      label="Joined"
                      variant="outlined"
                      icon={<Done />}
                      color="success"
                    />
                  ) : (
                    <Button
                      disabled={isLoading}
                      variant="outlined"
                      onClick={() => joinDmApi(user._id)}
                      size="small"
                    >
                      {isLoading ? <UpdateIcon /> : 'Join'}
                    </Button>
                  )
                }
                sx={
                  errorText
                    ? {
                        border: '1px solid red',
                        borderRadius: '5px',
                      }
                    : {}
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="" sx={{ width: 30, height: 30 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
                  }
                  secondary={<Typography variant="body2">{user.email}</Typography>}
                />
              </ListItem>
              {errorText && (
                <Typography variant="caption" color="red">
                  {errorText}
                </Typography>
              )}
              <Divider variant="fullWidth" light />
            </div>
          );
        })}
      </Box>
    </>
  );
};

const JoinGroup = ({ newChats }: { newChats: NewGroupsState }) => (
  <>
    {newChats.groups.length === 0 && (
      <Box
        sx={{
          py: 5,
          pt: 8,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
          }}
        >
          No new Groups availabe to join!
        </Typography>
      </Box>
    )}
    <Box
      sx={{
        mt: 2,
      }}
    >
      {/* {newChats.users.map((user) => (
        <div key={user._id}>
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
          </ListItem>
          <Divider variant="fullWidth" light />
        </div>
      ))} */}
    </Box>
  </>
);

export function JoinDmOrGroupModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const dispatch = useAppDispath();
  const newChats = useAppSelector((state) => state.newGroups);

  const refreshNew = () => {
    dispatch(fetchNewGroups());
  };
  const fetchGroupsData = async () => {
    await fetchGroupsAPI()
      .then(({ data }) => {
        dispatch(changeGroupData(data));
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Join DM/Group
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
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label="Join DM" id="join-dm" aria-controls="tab-1" />
              <Tab label="Join Group" id="join-group" aria-controls="tab-2" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <JoinDM newChats={newChats} refreshNew={refreshNew} fetchGroupsData={fetchGroupsData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <JoinGroup newChats={newChats} />
          </TabPanel>
        </Box>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}
