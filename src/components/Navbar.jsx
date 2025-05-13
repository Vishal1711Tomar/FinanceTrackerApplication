import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Finance Tracker</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/add">Add Transaction</Link></li>
        <li><Link to="/history">Transaction History</Link></li>
        <li><Link to="/budgets">Budgets</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;