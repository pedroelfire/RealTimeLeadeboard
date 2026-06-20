import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/login", { email, password });
      navigate("/users");
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white dark:bg-zinc-950 p-6 rounded-2xl">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 text-left">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-neutral-500 dark:text-neutral-400 text-left text-sm">
            Ingresa tus datos para acceder y competir en tiempo real.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Correo Electrónico
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-zinc-900"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="password" className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Contraseña
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus-visible:ring-2 focus-visible:ring-indigo-500 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-zinc-900"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all shadow-md shadow-indigo-500/20"
            >
              {loading ? "Cargando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-6 border-t border-neutral-100 dark:border-neutral-900 text-center flex justify-center text-sm text-neutral-500 dark:text-neutral-400">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
