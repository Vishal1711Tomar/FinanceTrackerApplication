import React from 'react';
import TransactionTable from '../components/TransactionTable';

const TransactionHistory = () => {
  return (
    <div className="transaction-history-page">
      <h1>Transaction History</h1>
      <TransactionTable />
    </div>
  );
};

export default TransactionHistory;
