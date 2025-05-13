import React from 'react';
import StatsCard from '../components/StatsCard';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';
import { useFinance } from '../context/FinanceContext';

const Dashboard = () => {
  const { state } = useFinance();

  const totalIncome = state.transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <StatsCard title="Total Income" value={`$${totalIncome.toFixed(2)}`} />
        <StatsCard title="Total Expenses" value={`$${totalExpenses.toFixed(2)}`} />
        <StatsCard title="Balance" value={`$${balance.toFixed(2)}`} />
      </div>
      <div className="charts">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
