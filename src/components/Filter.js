import React, { useState } from 'react';

const Filter = ({ onApply, onClose }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    from: '',
    to: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({ type: 'all', category: 'all', from: '', to: '' });
    onApply({ type: 'all', category: 'all', from: '', to: '' });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="section-title">Filter Transactions</h2>

        <label>Type</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Category</label>
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Salary">Salary</option>
        </select>

        <label>From</label>
        <input type="date" name="from" value={filters.from} onChange={handleChange} />

        <label>To</label>
        <input type="date" name="to" value={filters.to} onChange={handleChange} />

        <div className="form-buttons">
          <button className="btn-primary" onClick={handleApply}>Apply</button>
          <button className="btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
