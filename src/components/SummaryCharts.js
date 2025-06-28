import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const SummaryCharts = ({ data }) => {
  return (
    <div className="card chart-card">
      <h2 className="section-title">Smart Expense & Income Analytics</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#00ff9f" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" stroke="#ff4d67" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryCharts;
