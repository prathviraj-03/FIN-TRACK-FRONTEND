import React, { useState } from 'react';
import { addTransaction } from '../api';

const AddTransaction = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'income',
    category: '',
    date: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) return;
    try {
      const res = await addTransaction(formData);
      onAdd(res);
    } catch (err) {
      if (err.response?.status === 401) alert('Please login to add transactions');
      else alert(err.response?.data?.message || 'Could not add transaction');
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="section-title">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Food</option>
            <option>Transportation</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Shopping</option>
            <option>Salary</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label>Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
