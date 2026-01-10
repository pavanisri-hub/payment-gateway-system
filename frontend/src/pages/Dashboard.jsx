import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    amount: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Placeholder logic (allowed in Deliverable 1)
    setStats({
      total: 1,
      amount: 50000,
      successRate: 100,
    });
  }, []);

  return (
    <div data-test-id="dashboard">
      <div data-test-id="api-credentials">
        <div>
          <label>API Key</label>
          <span data-test-id="api-key">key_test_abc123</span>
        </div>
        <div>
          <label>API Secret</label>
          <span data-test-id="api-secret">secret_test_xyz789</span>
        </div>
      </div>

      <div data-test-id="stats-container">
        <div data-test-id="total-transactions">{stats.total}</div>
        <div data-test-id="total-amount">₹{stats.amount}</div>
        <div data-test-id="success-rate">{stats.successRate}%</div>
      </div>
    </div>
  );
}