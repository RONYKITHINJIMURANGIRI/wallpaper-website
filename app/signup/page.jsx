"use client";

import { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function SignupPage() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasMissingFields = !formData.name.trim() || !formData.email.trim() || !formData.password.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Unable to create account.");
      }

      setStatus({ type: "success", message: payload.message });
      setFormData(initialState);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header page="signup" />
      <main className="relative min-h-screen overflow-hidden bg-[#020612] text-white pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),transparent_35%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
            <section className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1 text-sm text-cyan-200 font-semibold">
                Free signup · no audience needed
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                Create your free account and keep your access ready.
              </h1>
              <p className="max-w-xl text-gray-300 leading-8">
                Secure your wallpaper access with a clean signup flow. For now, registration is free and easy — credentials are stored locally on the server while you grow your audience.
              </p>
              <div className="grid gap-3 text-sm text-gray-400">
                <p>
                  <span className="font-semibold text-white">What you get</span>: a polished signup experience, password-safe account creation, and fast onboarding without the premium gate.
                </p>
                <p>
                  <span className="font-semibold text-white">Why now</span>: this app is free while you build traction, so users can join without any paywall.
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-[#08101f]/80 backdrop-blur p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Secure account</p>
                <h2 className="mt-3 text-2xl font-bold">Create your account</h2>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="text-sm text-gray-400">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050b14] px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050b14] px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-400">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#050b14] px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={hasMissingFields || isSubmitting}
                  className="inline-flex w-full justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account…" : "Create free account"}
                </button>
                {status.message && (
                  <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20" : "bg-rose-500/10 text-rose-200 border border-rose-500/20"}`}>
                    {status.message}
                  </div>
                )}
                <p className="text-xs text-gray-500 leading-6">
                  This signup flow stores credentials locally in <code className="rounded bg-slate-900 px-1 py-0.5 text-xs text-cyan-200">credentials.json</code> on the server for development use.
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
