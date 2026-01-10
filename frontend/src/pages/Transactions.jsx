export default function Transactions() {
  return (
    <table data-test-id="transactions-table">
      <thead>
        <tr>
          <th>Payment ID</th>
          <th>Order ID</th>
          <th>Amount</th>
          <th>Method</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        <tr data-test-id="transaction-row" data-payment-id="pay_test">
          <td data-test-id="payment-id">pay_test</td>
          <td data-test-id="order-id">order_test</td>
          <td data-test-id="amount">50000</td>
          <td data-test-id="method">upi</td>
          <td data-test-id="status">success</td>
          <td data-test-id="created-at">2024-01-15 10:31:00</td>
        </tr>
      </tbody>
    </table>
  );
}