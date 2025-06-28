import React from 'react';
import { deleteTransaction } from '../api';

const Transaction = ({ transaction, onDelete }) => {
  const handleDelete = async () => {
    await deleteTransaction(transaction._id);
    onDelete(transaction._id);
  };

  return (
    <tr className="transaction-row">
      <td>{new Date(transaction.date).toLocaleDateString()}</td>
      <td>{transaction.category}</td>
      <td className={transaction.type === 'income' ? 'green' : 'red'}>
        {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
      </td>
      <td className="capitalize">{transaction.type}</td>
      <td>
        <button onClick={handleDelete} className="delete-btn">🗑️</button>
      </td>
    </tr>
  );
};

export default Transaction;
