import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFinance } from '../../context/FinanceContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF0', '#FF6384'];

const CategoryPieChart = () => {
  const { state } = useFinance();
  const data = [];

  state.transactions.forEach((tx) => {
    if (tx.type === 'Expense') {
      const found = data.find((item) => item.name === tx.category);
      if (found) {
        found.value += tx.amount;
      } else {
        data.push({ name: tx.category, value: tx.amount });
      }
    }
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryPieChart;