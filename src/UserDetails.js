// UserDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const user = users.find((user) => user.id === id);

  return (
    <Paper>
      <Typography variant="h5">{user.name}</Typography>
      <Typography>Age: {user.age}</Typography>
      <Typography>Gender: {user.gender}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>Email: {user.email}</Typography>
    </Paper>
  );
};

export default UserDetails;
