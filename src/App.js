import React, { useEffect, useState } from 'react';
import './App.css';

import { getAllTransactions } from './api';

import Balance from './components/Balance';
import SummaryCharts from './components/SummaryCharts';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filtered, setFiltered] = useState([]);

  // Fetch data
  const fetchTransactions = async () => {
    const res = await getAllTransactions();
    setTransactions(res);
    setFiltered(res);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getSummaryData = () => {
    const data = {};
    filtered.forEach((t) => {
      const d = new Date(t.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      if (!data[d]) data[d] = { date: d, income: 0, expense: 0 };
      if (t.type === 'income') data[d].income += +t.amount;
      else data[d].expense += +t.amount;
    });
    return Object.values(data);
  };

  const income = filtered
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + +t.amount, 0);

  const expense = filtered
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + +t.amount, 0);

  const applyFilters = (filters) => {
    let result = [...transactions];
    if (filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category);
    }
    if (filters.from) {
      result = result.filter((t) => new Date(t.date) >= new Date(filters.from));
    }
    if (filters.to) {
      result = result.filter((t) => new Date(t.date) <= new Date(filters.to));
    }
    setFiltered(result);
  };

  const handleNewTransaction = () => {
    fetchTransactions();
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1 className="app-title">EXPENSE MANAGER</h1>
        </header>


        <Balance income={income} expense={expense} />
        <SummaryCharts data={getSummaryData()} />

        <div className="actions">
          <button className="btn-primary" onClick={() => setShowAddForm(true)}>
            ➕ Add Transaction
          </button>
          <button className="btn-secondary" onClick={() => setShowFilter(true)}>
            🔍 Filter
          </button>
        </div>

<TransactionList transactions={filtered || []} onDelete={fetchTransactions} />

        {showAddForm && (
          <AddTransaction onClose={() => setShowAddForm(false)} onAdd={handleNewTransaction} />
        )}

        {showFilter && (
          <Filter onClose={() => setShowFilter(false)} onApply={applyFilters} />
        )}
      </div>
    </div>
  );
}

export default App;
