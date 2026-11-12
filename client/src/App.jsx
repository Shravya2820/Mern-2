import { useState } from "react";

const API_URL = "http://localhost:5000/api/auth";

export default function App() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed.");
      setMessage(data.message);
      setMessageType("success");
      setForm({ email: "", password: "" });
    } catch (error) {
      setMessage(error.message || "Unable to connect to the server.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="signup-card">
        <div className="brand-mark">✦</div>
        <p className="eyebrow">WELCOME ABOARD</p>
        <h1>Sign Up</h1>
        <p className="intro">Already a member? <a href="#login" onClick={(e) => e.preventDefault()}>Log In</a></p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Enter your email"
            value={form.email} onChange={handleChange} autoComplete="email" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password"
            placeholder="Create a password (min. 6 characters)" value={form.password}
            onChange={handleChange} autoComplete="new-password" minLength="6" required />
          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        {message && <p className={`message ${messageType}`} role="status">{message}</p>}
        <p className="fine-print">By signing up, you agree to keep your account details secure.</p>
      </section>
    </main>
  );
}
