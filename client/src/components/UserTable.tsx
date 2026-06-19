import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export function UserTable({ users, loading, error, onEdit, onDelete }: UserTableProps) {
  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (users.length === 0) return <p className="status">No users found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button className="btn-danger" onClick={() => onDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
