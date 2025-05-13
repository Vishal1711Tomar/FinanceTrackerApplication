import React from 'react';
import CategoryPieChart from '../components/Charts/CategoryPieChart';
import MonthlyBarChart from '../components/Charts/MonthlyBarChart';

const Reports = () => {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <div className="reports-charts">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Reports;
