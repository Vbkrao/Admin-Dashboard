

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import UserDetails from './UserDetails';
import usersData from './users.json';

function App() {
  const [users, setUsers] = useState(usersData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard users={users} setUsers={setUsers} />} />
        <Route path="/user/:id" element={<UserDetails users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;

