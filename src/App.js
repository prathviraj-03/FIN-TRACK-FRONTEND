import React, { useEffect, useState } from 'react';
import './App.css';

import { getAllTransactions, downloadExcelReport } from './api';
import AuthForm from './components/AuthForm';

import Balance from './components/Balance';
import SummaryCharts from './components/SummaryCharts';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';
import OverviewPieChart from './components/OverviewPieChart';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; }
    catch (e) { return null; }
  });

  const fetchTransactions = async () => {
    try {
      const res = await getAllTransactions();
      setTransactions(res);
      setFiltered(res);
    } catch (err) {
      console.error('Could not fetch transactions', err);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const handleAuthSuccess = (u) => { setUser(u); fetchTransactions(); };

  const handleDownload = async () => {
    try {
      const res = await downloadExcelReport();
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'transactions.xlsx'; document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const getSummaryData = () => {
    const data = {};
    filtered.forEach((t) => {
      const d = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!data[d]) data[d] = { date: d, income: 0, expense: 0 };
      if (t.type === 'income') data[d].income += +t.amount; else data[d].expense += +t.amount;
    });
    return Object.values(data);
  };

  const income = filtered.filter((t) => t.type === 'income').reduce((sum, t) => sum + +t.amount, 0);
  const expense = filtered.filter((t) => t.type === 'expense').reduce((sum, t) => sum + +t.amount, 0);

  const applyFilters = (filters) => {
    let result = [...transactions];
    if (filters.type && filters.type !== 'all') result = result.filter((t) => t.type === filters.type);
    if (filters.category && filters.category !== 'all') result = result.filter((t) => t.category === filters.category);
    if (filters.from) result = result.filter((t) => new Date(t.date) >= new Date(filters.from));
    if (filters.to) result = result.filter((t) => new Date(t.date) <= new Date(filters.to));
    setFiltered(result);
  };

  const handleNewTransaction = () => { fetchTransactions(); };

  return (
    <div className="App">
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="logo">EX</div>
            <div>
              <div className="app-title">Expense Manager</div>
              <div className="sub-label">Track income and expenses with ease</div>
            </div>
          </div>

          <div className="top-actions">
            {user ? (
              <>
                <span className="greeting">Hello, {user.name}</span>
                <button title="Download report" className="icon-btn" onClick={handleDownload}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v12" stroke="#07121a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11l4 4 4-4" stroke="#07121a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="17" width="18" height="4" rx="1" fill="#07121a" />
                  </svg>
                  Download
                </button>
                <button title="Logout" className="icon-btn" onClick={handleLogout}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <button className="icon-btn primary" onClick={() => setShowAuth(true)}>
                <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#07121a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#07121a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Login / Sign Up
              </button>
            )}
          </div>
        </div>

        <div className="dashboard">
          <div className="stats-overview">
            <Balance income={income} expense={expense} />
          </div>
          <div className="visualizations">
            <SummaryCharts data={getSummaryData()} />
            <OverviewPieChart data={filtered} />
          </div>
          <div className="actions">
            <button className="btn-primary" onClick={() => setShowAddForm(true)}>➕ Add Transaction</button>
            <button className="btn-secondary" onClick={() => setShowFilter(true)}>🔍 Filter</button>
            <button className="btn-secondary" onClick={handleDownload}>Download Report</button>
          </div>
          <TransactionList transactions={filtered || []} onDelete={fetchTransactions} />
        </div>

        {showAddForm && (
          <AddTransaction onClose={() => setShowAddForm(false)} onAdd={handleNewTransaction} />
        )}

        {showFilter && (
          <Filter onClose={() => setShowFilter(false)} onApply={applyFilters} />
        )}

        {showAuth && (
          <AuthForm onClose={() => setShowAuth(false)} onAuthSuccess={handleAuthSuccess} />
        )}
      </div>
    </div>
  );
}

export default App;
