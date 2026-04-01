import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

export default function Login() {
  const [form, setform] = useState({
    email: "",
    password: ""
  });

  const [msg, setmsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      console.log(res, "data");

      localStorage.setItem("token", res.data.token);
      setmsg("Login Successfully ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setmsg(err.response?.data?.message || "An Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}