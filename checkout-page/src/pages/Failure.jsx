import { useLocation } from "react-router-dom";

export default function Failure() {
  const { state } = useLocation();

  return (
    <div style={{ padding: 40 }}>
      <h2>Payment Failed ❌</h2>
      <p>{state?.error_description || "Try again"}</p>
    </div>
  );
}