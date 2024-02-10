import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField } from '@mui/material';

const Dashboard = ({ users, setUsers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [detailsMode, setDetailsMode] = useState(false);

  const handleEditClick = (user) => {
    setSelectedUserId(user.id);
    setEditedUser({ ...user });
    setModalMode('edit');
    setOpenModal(true);
  };

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setModalMode('delete');
    setOpenModal(true);
  };

  const handleCreateClick = () => {
    setModalMode('create');
    setOpenModal(true);
    setEditedUser({
      id: '',
      name: '',
      nickName: '',
      age: '',
      gender: '',
      phone: '',
      email: ''
    });
  };

  const handleConfirm = () => {
    if (modalMode === 'delete') {
      const updatedUsers = users.filter(user => user.id !== selectedUserId);
      setUsers(updatedUsers);
    } else if (modalMode === 'edit') {
      const updatedUsers = users.map(user => {
        if (user.id === selectedUserId) {
          return { ...user, ...editedUser };
        }
        return user;
      });
      setUsers(updatedUsers);
    } else if (modalMode === 'create') {
      const newId = Math.max(...users.map(user => parseInt(user.id))) + 1; // Generate new id
      const newUser = { ...editedUser, id: String(newId) }; // Add new id to the user
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
    setEditedUser(null);
    setModalMode('');
  };

  const handleNameClick = () => {
    setDetailsMode(true);
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
            {!detailsMode && <TableCell>Operations</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {detailsMode ? (
                  user.name
                ) : (
                  <Link to={`/user/${user.id}`} onClick={handleNameClick}>
                    {user.name}
                  </Link>
                )}
              </TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nickName}</TableCell>
              {!detailsMode && (
                <TableCell>
                  <Button onClick={() => handleEditClick(user)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(user.id)}>Delete</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleCreateClick}>Create</Button> {/* Add Create button */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
          {modalMode === 'edit' && (
            <>
              {/* Edit form fields */}
            </>
          )}
          {modalMode === 'delete' && (
            <>
              <p>Are you sure you want to delete this user?</p>
            </>
          )}
          {modalMode === 'create' && (
            <>
              <TextField label="ID" value={editedUser?.id} onChange={(e) => setEditedUser({ ...editedUser, id: e.target.value })} fullWidth />
              <TextField label="Name" value={editedUser?.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} fullWidth />
              <TextField label="Nick Name" value={editedUser?.nickName} onChange={(e) => setEditedUser({ ...editedUser, nickName: e.target.value })} fullWidth />
              <TextField label="Age" value={editedUser?.age} onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })} fullWidth />
              <TextField label="Gender" value={editedUser?.gender} onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })} fullWidth />
              <TextField label="Phone" value={editedUser?.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} fullWidth />
              <TextField label="Email" value={editedUser?.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} fullWidth />
            </>
          )}
          <Button variant="contained" onClick={handleConfirm}>{modalMode === 'delete' ? 'Delete' : 'Save'}</Button>
          <Button variant="contained" onClick={handleCloseModal}>Cancel</Button>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default Dashboard;

