import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../context/FinanceContext';
import dayjs from 'dayjs';

const MonthlyBarChart = () => {
  const { state } = useFinance();
  const monthlyData = {};

  state.transactions.forEach((tx) => {
    const month = dayjs(tx.date).format('MMM YYYY');
    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }
    monthlyData[month] += tx.amount;
  });

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyBarChart;