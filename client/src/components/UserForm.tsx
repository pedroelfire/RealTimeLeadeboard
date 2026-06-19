import { useState, useEffect } from "react";

interface UserFormProps {
  initial?: { email: string; name: string };
  onSubmit: (data: { email: string; name: string }) => Promise<void>;
  onCancel?: () => void;
}

export function UserForm({ initial, onSubmit, onCancel }: UserFormProps) {
  const [email, setEmail] = useState(initial?.email ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setEmail(initial.email);
      setName(initial.name);
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ email: email.trim(), name: name.trim() });
      setEmail("");
      setName("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : initial ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
