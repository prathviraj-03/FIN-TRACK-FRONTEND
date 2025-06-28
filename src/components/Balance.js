import React from 'react';


const Balance = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="card balance-card">
      <h2 className="section-title">Comprehensive Financial Overview</h2>
      <div className="balance-content">
        <div className="balance-amount">
          <p className="label">My Balance</p>
          <h1>${balance.toFixed(2)}</h1>
          <p className="sub-label">Your Balance in Month</p>
        </div>
        <div className="income-expense">
          <div className="income">
            <p className="label">Income</p>
            <h3 className="green">+${income.toFixed(2)}</h3>
          </div>
          <div className="expense">
            <p className="label">Expenses</p>
            <h3 className="red">-${expense.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
