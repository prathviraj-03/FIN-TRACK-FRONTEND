export default function IncomeExpenses({ transactions = [] }) {
  const amounts = transactions.map(transaction => ({
    type: transaction.type,
    amount: parseFloat(transaction.amount)
  }));

  const income = amounts
    .filter(item => item.type === 'income')
    .reduce((acc, item) => (acc + item.amount), 0)
    .toFixed(2);

  const expense = amounts
    .filter(item => item.type === 'expense')
    .reduce((acc, item) => (acc + item.amount), 0)
    .toFixed(2);

  return (
    <div className="card">
      <div className="income-expense">
        <div className="income">
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>
    </div>
  );
}