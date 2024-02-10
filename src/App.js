// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// App.js
// App.js
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

