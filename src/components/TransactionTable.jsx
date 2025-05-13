import React from 'react';
import { useFinance } from '../context/FinanceContext';

const TransactionTable = () => {
  const { state, dispatch } = useFinance();

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {state.transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.date}</td>
            <td>{tx.category}</td>
            <td>${tx.amount.toFixed(2)}</td>
            <td>{tx.type}</td>
            <td>{tx.description}</td>
            <td><button onClick={() => handleDelete(tx.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;