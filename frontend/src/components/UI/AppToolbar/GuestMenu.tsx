import React from 'react';
import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../utils/constants';

const GuestMenu: React.FC = () => {
  return (
    <Stack direction="row" spacing={3}>
      <Button
        component={NavLink}
        to={routes.register}
        sx={{ textTransform: 'none' }}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        component={NavLink}
        to={routes.login}
        sx={{ textTransform: 'none' }}
        disableElevation
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default GuestMenu;
