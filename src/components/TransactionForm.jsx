import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { v4 as uuidv4 } from 'uuid';

const TransactionForm = () => {
  const { addTransaction } = useFinance();

  const [formData, setFormData] = useState({
    type: 'Income',
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) return;

    const newTransaction = {
      id: uuidv4(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    addTransaction(newTransaction); // ✅ Use context method instead of dispatch
    setFormData({ type: 'Income', amount: '', category: '', date: '', description: '' });
  };

  return (
    <form className="transaction-form-card" onSubmit={handleSubmit}>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
