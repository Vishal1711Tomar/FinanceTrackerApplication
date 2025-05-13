import React from 'react';
import BudgetCard from '../components/BudgetCard';
import { useFinance } from '../context/FinanceContext';

const Budgets = () => {
  const { state } = useFinance();

  // Calculate total spending per category
  const categorySpending = state.transactions.reduce((acc, transaction) => {
    if (transaction.type === 'Expense') {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    }
    return acc;
  }, {});

  // Combine budget categories and spending categories to avoid missing data
  const categories = Array.from(
    new Set([
      ...state.budgets.map((b) => b.category),
      ...Object.keys(categorySpending),
    ])
  );

  return (
    <div className="budgets-page">
      <h1>Budgets</h1>
      <div className="budget-grid">
        {categories.length === 0 ? (
          <p>No budgets set yet. Add a budget above to begin tracking!</p>
        ) : (
          categories.map((cat, index) => (
            <BudgetCard key={index} category={cat} />
          ))
        )}
      </div>
    </div>
  );
};

export default Budgets;
