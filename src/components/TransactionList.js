import React from 'react';
import Transaction from './Transaction';

const TransactionList = ({ transactions = [], onDelete }) => {
  if (!Array.isArray(transactions)) {
    console.error('transactions is not an array:', transactions);
    return null;
  }

  const total = transactions.reduce((acc, t) =>
    t.type === 'income' ? acc + +t.amount : acc - +t.amount, 0
  );

  return (
    <div className="card">
      <h2 className="section-title">Transaction List</h2>
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <Transaction key={t._id} transaction={t} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
        <div className="total-row">Total Balance: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default TransactionList;
