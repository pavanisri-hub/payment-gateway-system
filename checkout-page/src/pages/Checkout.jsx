import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchOrderPublic,
  createPaymentPublic,
  getPayment,
} from "../services/api";

export default function Checkout() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [order, setOrder] = useState(null);
  const [method, setMethod] = useState(null);
  const [vpa, setVpa] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchOrderPublic(orderId)
      .then(setOrder)
      .catch(() => alert("Invalid order"));
  }, [orderId]);

  const payUPI = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payment = await createPaymentPublic({
      order_id: orderId,
      method: "upi",
      vpa,
    });

    pollStatus(payment.id);
  };

  const pollStatus = (paymentId) => {
    const interval = setInterval(async () => {
      const p = await getPayment(paymentId);
      if (p.status === "success") {
        clearInterval(interval);
        navigate("/success", { state: p });
      }
      if (p.status === "failed") {
        clearInterval(interval);
        navigate("/failure", { state: p });
      }
    }, 2000);
  };

  if (!order) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h2>Complete Payment</h2>

      <p>
        Amount: <b>₹{order.amount / 100}</b>
      </p>
      <p>
        Order ID: <b>{order.id}</b>
      </p>

      <button onClick={() => setMethod("upi")}>UPI</button>

      {method === "upi" && (
        <form onSubmit={payUPI}>
          <input
            placeholder="username@bank"
            value={vpa}
            onChange={(e) => setVpa(e.target.value)}
            required
          />
          <br />
          <button type="submit">Pay ₹{order.amount / 100}</button>
        </form>
      )}

      {processing && <h3>Processing payment...</h3>}
    </div>
  );
}