import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [exercisePart, setExercisePart] = useState('part1'); // Default to Part 1
  const [ordersData, setOrdersData] = useState('');
  const [transactionsData, setTransactionsData] = useState('');
  const [resultData, setResultData] = useState([]);

  const handleMatchData = async () => {
    try {
      // Parse the orders and transactions data from the textarea inputs
      // If the inputs are not empty, parse the JSON data, otherwise use empty arrays
      const orders = ordersData.trim() !== '' ? JSON.parse(ordersData) : [];
      const transactions = transactionsData.trim() !== '' ? JSON.parse(transactionsData) : [];

      const response = await fetch(`http://localhost:4000/matchData/${exercisePart}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orders: orders,
          transactions: transactions,
        }),
      });

      const data = await response.json();
      setResultData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2 className="mt-3">Data Matching Tool</h2>
        {/* Dropdown to choose exercise part */}
        <select
          className="form-select mt-3"
          value={exercisePart}
          onChange={(e) => setExercisePart(e.target.value)}
        >
          <option value="part1">Part 1</option>
          <option value="part2">Part 2</option>
        </select>
        <div className="row">
          <div className="col-md-6">
            <textarea
              className="form-control mt-3"
              rows="6"
              placeholder="Orders JSON"
              value={ordersData}
              onChange={(e) => setOrdersData(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <textarea
              className="form-control mt-3"
              rows="6"
              placeholder="Transactions JSON"
              value={transactionsData}
              onChange={(e) => setTransactionsData(e.target.value)}
            />
          </div>
        </div>
        {/* Button to trigger data matching */}
        <button className="btn btn-primary mt-3" onClick={handleMatchData}>Match Data</button>
      </div>
      <div className="result mt-4">
        <h3>Results:</h3>
        {/* Table to display matched data */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Orders</th>
              <th>Transactions</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((group, index) => (
              <tr key={index}>
                <td>{JSON.stringify(group[0])}</td>
                <td>
                  <ul className="list-unstyled">
                    {group.slice(1).map((transaction, tIndex) => (
                      <li key={tIndex}>{JSON.stringify(transaction)}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
