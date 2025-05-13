import React from 'react';
import TransactionForm from '../components/TransactionForm';

const AddTransaction = () => {
  return (
    <div className="add-transaction-page">
      <h1>Add Transaction</h1>
      <TransactionForm />
    </div>
  );
};

export default AddTransaction;