import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY = { name: "", price: "", unit: "per piece", description: "" };

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // service id being edited (or "new")
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("mb_admin_token") : null;
  const headers = { "x-admin-token": token };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await axios.get(`${API}/services`);
      setServices(r.data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const startEdit = (svc) => {
    setEditing(svc.id);
    setForm({ name: svc.name, price: String(svc.price), unit: svc.unit, description: svc.description || "" });
  };

  const startNew = () => {
    setEditing("new");
    setForm(EMPTY);
  };

  const cancel = () => {
    setEditing(null);
    setForm(EMPTY);
  };

  const save = async () => {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price),
      unit: form.unit.trim() || "per piece",
      description: form.description.trim(),
    };
    if (Number.isNaN(payload.price) || payload.price < 0) {
      toast.error("Enter a valid price");
      return;
    }
    setSaving(true);
    try {
      if (editing === "new") {
        await axios.post(`${API}/admin/services`, payload, { headers });
        toast.success("Service added");
      } else {
        await axios.patch(`${API}/admin/services/${editing}`, payload, { headers });
        toast.success("Service updated");
      }
      cancel();
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await axios.delete(`${API}/admin/services/${id}`, { headers });
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden" data-testid="services-admin">
      <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <div className="font-heading font-bold text-neutral-900">Services & Pricing</div>
          <div className="text-xs text-neutral-500 mt-0.5">Add, edit or remove services shown on the website</div>
        </div>
        {editing !== "new" && (
          <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white" style={{ backgroundColor: "#D92328" }} data-testid="add-service-btn">
            <Plus className="w-4 h-4" /> Add service
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-10 flex items-center justify-center text-neutral-500"><Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…</div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {editing === "new" && (
            <ServiceForm form={form} setForm={setForm} onSave={save} onCancel={cancel} saving={saving} isNew />
          )}
          {services.length === 0 && editing !== "new" && (
            <div className="p-10 text-center text-neutral-500">No services yet. Click "Add service" to create one.</div>
          )}
          {services.map((s) => (
            <div key={s.id} className="px-5 py-4">
              {editing === s.id ? (
                <ServiceForm form={form} setForm={setForm} onSave={save} onCancel={cancel} saving={saving} />
              ) : (
                <div className="flex items-center justify-between gap-4" data-testid={`svc-row-${s.id}`}>
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 truncate">{s.name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5 truncate">{s.description}</div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="font-heading font-bold text-lg text-neutral-900">₹{s.price}</div>
                      <div className="text-[11px] text-neutral-500">{s.unit}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(s)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-neutral-200 text-neutral-600 hover:bg-neutral-50" title="Edit" data-testid={`svc-edit-${s.id}`}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(s.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-neutral-200 text-neutral-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200" title="Delete" data-testid={`svc-delete-${s.id}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceForm({ form, setForm, onSave, onCancel, saving, isNew }) {
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200" data-testid={isNew ? "svc-new-form" : "svc-edit-form"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Service name</Label>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Curtain Wash" className="mt-1" data-testid="svc-form-name" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Price (₹)</Label>
            <Input type="number" min="0" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} className="mt-1" data-testid="svc-form-price" />
          </div>
          <div>
            <Label>Unit</Label>
            <Input value={form.unit} onChange={(e) => update("unit", e.target.value)} placeholder="per piece" className="mt-1" data-testid="svc-form-unit" />
          </div>
        </div>
        <div className="md:col-span-2">
          <Label>Description</Label>
          <Textarea rows={2} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Short description shown on the website" className="mt-1" data-testid="svc-form-desc" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white disabled:opacity-60" style={{ backgroundColor: "#16a34a" }} data-testid="svc-form-save">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
        </button>
        <button onClick={onCancel} disabled={saving} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border border-neutral-200 hover:bg-white" data-testid="svc-form-cancel">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>
    </div>
  );
}
