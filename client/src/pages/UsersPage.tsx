import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { UserForm, UserTable } from "../components";
import type { User } from "../types/user";

export function UsersPage() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleSubmit = async (data: { email: string; name: string }) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }
  };

  const handleEdit = (user: User) => setEditingUser(user);

  const handleCancel = () => setEditingUser(null);

  return (
    <div className="page">
      <h1>User Management</h1>

      <UserForm
        initial={editingUser ?? undefined}
        onSubmit={handleSubmit}
        onCancel={editingUser ? handleCancel : undefined}
      />

      <UserTable
        users={users}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={deleteUser}
      />
    </div>
  );
}
