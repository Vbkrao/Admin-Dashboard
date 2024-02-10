import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField } from '@mui/material';

const Dashboard = ({ users, setUsers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    id: '',
    name: '',
    nickName: '',
    age: '',
    gender: '',
    phone: '',
    email: ''
  });

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedUser({ ...user }); // Set initial values for editing
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalMode('delete');
    setOpenModal(true);
  };

  const handleCreateClick = () => {
    // Clear input fields for creating a new user
    setEditedUser({
      id: '',
      name: '',
      nickName: '',
      age: '',
      gender: '',
      phone: '',
      email: ''
    });
    setModalMode('create');
    setOpenModal(true);
  };

  const handleConfirm = () => {
    if (modalMode === 'edit') {
      // Update user details if in edit mode
      const updatedUsers = users.map(user => {
        if (user.id === selectedUser.id) {
          return { ...user, ...editedUser }; // Merge changes
        }
        return user;
      });
      setUsers(updatedUsers);
    } else if (modalMode === 'create') {
      // Add new user if in create mode
      const newId = Math.max(...users.map(user => parseInt(user.id))) + 1;
      const newUser = { ...editedUser, id: String(newId) };
      setUsers([...users, newUser]);
    } else if (modalMode === 'delete') {
      // Delete user if in delete mode
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    // Close modal and reset state
    setOpenModal(false);
    setSelectedUser(null);
    setEditedUser({
      id: '',
      name: '',
      nickName: '',
      age: '',
      gender: '',
      phone: '',
      email: ''
    });
    setModalMode('');
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nick Name</TableCell>
            <TableCell>Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nickName}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(user)}>Edit</Button>
                <Button onClick={() => handleDeleteClick(user)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleCreateClick}>Create</Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
          {modalMode === 'delete' && <p>Are you sure you want to delete this user?</p>}
          {(modalMode === 'create' || modalMode === 'edit') && (
            <>
              <TextField label="ID" value={editedUser.id} onChange={(e) => setEditedUser({ ...editedUser, id: e.target.value })} fullWidth />
              <TextField label="Name" value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} fullWidth />
              <TextField label="Nick Name" value={editedUser.nickName} onChange={(e) => setEditedUser({ ...editedUser, nickName: e.target.value })} fullWidth />
              <TextField label="Age" value={editedUser.age} onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })} fullWidth />
              <TextField label="Gender" value={editedUser.gender} onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })} fullWidth />
              <TextField label="Phone" value={editedUser.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} fullWidth />
              <TextField label="Email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} fullWidth />
            </>
          )}
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default Dashboard;
