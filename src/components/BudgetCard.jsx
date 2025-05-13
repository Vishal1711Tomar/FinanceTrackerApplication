import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

const BudgetCard = ({ category }) => {
  const { state, setBudget } = useFinance();
  const [amount, setAmount] = useState('');

  const budget = state.budgets.find((b) => b.category === category);
  const spent = state.transactions
    .filter((t) => t.category === category && t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;
    setBudget(category, parseFloat(amount));
    setAmount('');
  };

  return (
    <div className="budget-card">
      <h3>{category}</h3>
      {budget ? (
        <>
          <p>Budget: ${budget.amount.toFixed(2)}</p>
          <p>Spent: ${spent.toFixed(2)}</p>
          <p>Remaining: ${(budget.amount - spent).toFixed(2)}</p>
        </>
      ) : (
        <>
          <p>No budget set for this category.</p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Set Budget"
        />
        <button type="submit">Set</button>
      </form>
    </div>
  );
};

export default BudgetCard;
