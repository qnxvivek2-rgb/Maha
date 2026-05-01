import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await axios.post(`${API}/admin/login`, { username, password });
      localStorage.setItem("mb_admin_token", r.data.token);
      localStorage.setItem("mb_admin_user", r.data.username);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="w-full max-w-md bg-white rounded-3xl border border-neutral-200 shadow-lg p-8">
        <div className="flex items-center gap-3 mb-7">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#D92328" }}>
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-heading font-bold text-xl text-neutral-900">Admin Login</div>
            <div className="text-xs text-neutral-500">Mahaveer Brothers Dashboard</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="u">Username</Label>
            <Input id="u" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5" data-testid="admin-username" />
          </div>
          <div>
            <Label htmlFor="p">Password</Label>
            <Input id="p" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5" data-testid="admin-password" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white font-semibold disabled:opacity-60"
            style={{ backgroundColor: "#0a0a0a" }}
            data-testid="admin-login-btn"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
