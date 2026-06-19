import { useState, useEffect, useCallback } from "react";
import { userApi } from "../api";
import type { User, CreateUserDTO, UpdateUserDTO } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (data: CreateUserDTO) => {
    await userApi.create(data);
    fetchUsers();
  };

  const updateUser = async (id: number, data: UpdateUserDTO) => {
    await userApi.update(id, data);
    fetchUsers();
  };

  const deleteUser = async (id: number) => {
    await userApi.remove(id);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, createUser, updateUser, deleteUser, refetch: fetchUsers };
}
