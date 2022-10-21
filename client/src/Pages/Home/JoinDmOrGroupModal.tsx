import React, { useState } from 'react';
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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { TabPanel } from '../../Utils/CommonComponents/TabPanel';
import { useAppSelector } from '../../Store/hooks';
import { NewGroupsState } from '../../Store/slices/newGroupsSlice';

const JoinDM = ({
  newChats,
  joinDm,
}: {
  newChats: NewGroupsState;
  joinDm: (userId: string) => void;
}) => (
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
      {newChats.users.map((user) => (
        <div key={user._id}>
          <ListItem
            disablePadding
            secondaryAction={
              <Button variant="outlined" onClick={() => joinDm(user._id)} size="small">
                Join
              </Button>
            }
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="" />
            </ListItemAvatar>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
          </ListItem>
          <Divider variant="fullWidth" light />
        </div>
      ))}
    </Box>
  </>
);

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

  const newChats = useAppSelector((state) => state.newGroups);

  const joinDm = (userId: string) => {
    console.log('clicks', userId);
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
            <JoinDM newChats={newChats} joinDm={joinDm} />
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
