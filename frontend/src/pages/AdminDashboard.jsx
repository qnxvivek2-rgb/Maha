import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, LogOut, RefreshCw, Trash2, MessageCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import ServicesAdmin from "../components/ServicesAdmin";
import { buildBookingMessage, buildWhatsappUrl } from "../lib/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "picked_up", label: "Picked Up" },
  { value: "in_progress", label: "In Progress" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  picked_up: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, delivered: 0 });
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("mb_admin_token") : null;

  const headers = { "x-admin-token": token };

  const logout = () => {
    localStorage.removeItem("mb_admin_token");
    localStorage.removeItem("mb_admin_user");
    navigate("/admin/login");
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [b, s] = await Promise.all([
        axios.get(`${API}/admin/bookings`, { headers }),
        axios.get(`${API}/admin/stats`, { headers }),
      ]);
      setBookings(b.data);
      setStats(s.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        logout();
      } else {
        toast.error("Failed to load bookings");
      }
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, [token, navigate, fetchData]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/bookings/${id}`, { status }, { headers });
      toast.success("Status updated");
      fetchData();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`${API}/admin/bookings/${id}`, { headers });
      toast.success("Booking deleted");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50" data-testid="admin-dashboard">
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/mb-logo.png" alt="Mahaveer Brothers" className="h-10 w-10 rounded-full object-contain bg-black" />
            <div>
              <div className="font-heading font-bold text-neutral-900">Admin Dashboard</div>
              <div className="text-xs text-neutral-500">Mahaveer Brothers</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchData} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-neutral-200 hover:bg-neutral-50" data-testid="admin-refresh-btn">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-neutral-900 text-white hover:bg-neutral-800" data-testid="admin-logout-btn">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "#0a0a0a" },
            { label: "Pending", value: stats.pending, color: "#D92328" },
            { label: "In Progress", value: stats.in_progress, color: "#F5A623" },
            { label: "Delivered", value: stats.delivered, color: "#16a34a" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-neutral-200 p-5" data-testid={`stat-${s.label.toLowerCase().replace(/\s/g, "-")}`}>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{s.label}</div>
              <div className="mt-2 font-heading font-black text-3xl" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="h-11 p-1 bg-neutral-200/60" data-testid="admin-tabs">
            <TabsTrigger value="bookings" className="px-5 text-sm" data-testid="tab-bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services" className="px-5 text-sm" data-testid="tab-services">Services & Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-5">
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <div className="font-heading font-bold text-neutral-900">All Bookings</div>
            <div className="text-xs text-neutral-500">{bookings.length} records</div>
          </div>
          {loading ? (
            <div className="p-10 flex items-center justify-center text-neutral-500"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…</div>
          ) : bookings.length === 0 ? (
            <div className="p-10 text-center text-neutral-500">No bookings yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-neutral-600 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-5 py-3">Customer</th>
                    <th className="text-left px-5 py-3">Service</th>
                    <th className="text-left px-5 py-3">Pickup</th>
                    <th className="text-left px-5 py-3">Status</th>
                    <th className="text-right px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-50" data-testid={`booking-row-${b.id}`}>
                      <td className="px-5 py-4 align-top">
                        <div className="font-semibold text-neutral-900">{b.name}</div>
                        <div className="text-xs text-neutral-500 mt-0.5">{b.phone}</div>
                        <div className="text-xs text-neutral-500 mt-1 max-w-xs">{b.address}</div>
                        {b.notes && <div className="text-xs text-neutral-400 mt-1 italic">"{b.notes}"</div>}
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="font-medium text-neutral-800">{b.service}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="text-neutral-800">{b.pickup_date}</div>
                        <div className="text-xs text-neutral-500">{b.pickup_time}</div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <Badge className={`${STATUS_COLORS[b.status] || ""} border font-medium`} variant="outline">
                          {STATUS_OPTIONS.find((s) => s.value === b.status)?.label || b.status}
                        </Badge>
                        <div className="mt-2">
                          <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                            <SelectTrigger className="h-8 text-xs w-36" data-testid={`status-trigger-${b.id}`}><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((o) => (
                                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={buildWhatsappUrl(buildBookingMessage(b))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-white"
                            style={{ backgroundColor: "#25D366" }}
                            title="Message on WhatsApp"
                            data-testid={`wa-${b.id}`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-neutral-200 text-neutral-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                            title="Delete"
                            data-testid={`delete-${b.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-5">
            <ServicesAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
