import { useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  return (
    <div style={{ padding: 40 }}>
      <h2>Payment Successful 🎉</h2>
      <p>Payment ID: {state?.id}</p>
    </div>
  );
}