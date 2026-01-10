import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Checkout() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id");

  const [order, setOrder] = useState(null);
  const [method, setMethod] = useState(null);
  const [vpa, setVpa] = useState("");
  const [payment, setPayment] = useState(null);
  const [state, setState] = useState("idle");

  /* =========================
     FETCH ORDER (PUBLIC)
     ========================= */
  useEffect(() => {
    if (!orderId) {
      setState("failed");
      return;
    }

    api
      .get(`/api/v1/orders/${orderId}/public`)
      .then((res) => setOrder(res.data))
      .catch(() => setState("failed"));
  }, [orderId]);

  /* =========================
     CREATE PAYMENT (PUBLIC)
     ========================= */
  const payUPI = async (e) => {
    e.preventDefault();

    if (!vpa.trim()) {
      alert("Enter valid UPI ID");
      return;
    }

    setState("processing");

    try {
      const res = await api.post("/api/v1/payments/public", {
        order_id: orderId,
        method: "upi",
        vpa,
      });

      setPayment(res.data);
      setState(res.data.status); // ✅ SUCCESS COMES HERE
    } catch (err) {
      console.error(err);
      setState("failed");
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div data-test-id="checkout-container">
      <h2>Complete Payment</h2>

      <p>
        Amount: ₹{order.amount / 100}
      </p>

      <p>
        Order ID: {order.id}
      </p>

      <button onClick={() => setMethod("upi")}>UPI</button>

      {method === "upi" && state === "idle" && (
        <form onSubmit={payUPI}>
          <input
            placeholder="username@bank"
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
          />
          <button type="submit">
            Pay ₹{order.amount / 100}
          </button>
        </form>
      )}

      {state === "processing" && <p>Processing payment…</p>}

      {state === "success" && payment && (
        <div>
          <h2>Payment Successful</h2>
          <p>Payment ID: {payment.id}</p>
        </div>
      )}

      {state === "failed" && (
        <div>
          <h2>Payment Failed</h2>
          <button onClick={() => setState("idle")}>Retry</button>
        </div>
      )}
    </div>
  );
}
