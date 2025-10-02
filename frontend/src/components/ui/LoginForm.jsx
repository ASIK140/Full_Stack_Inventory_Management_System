import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Username</label>
        <input
          type="userName"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
