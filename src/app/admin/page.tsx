'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ManagedUser {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  createdAt: number;
  lastSignInAt?: number;
  role: string;
  subscription: string;
  isSuperadmin?: boolean;
}

const ROOT_ADMIN_EMAIL = 'leogregus9@gmail.com';

export default function AdminDashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Quick grant form
  const [grantEmail, setGrantEmail] = useState('');
  const [grantRole, setGrantRole] = useState<'admin' | 'user'>('admin');
  const [grantPlan, setGrantPlan] = useState<'pro' | 'enterprise' | 'basic' | 'free'>('pro');
  const [grantLoading, setGrantLoading] = useState(false);
  const [grantStatus, setGrantStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const currentUserEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() || '';
  const isSuperadmin = currentUserEmail === ROOT_ADMIN_EMAIL;
  const isAdmin = isSuperadmin;

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push('/login?redirect_url=/admin');
      return;
    }

    if (!isAdmin) {
      setError('Access Denied: You must be an administrator to view this portal.');
      setLoading(false);
      return;
    }

    fetchUsers();
  }, [isLoaded, isSignedIn, isAdmin]);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }
      setUsers(data.users || []);
    } catch (err: any) {
      setError(err?.message || 'Error loading users');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateUser(userId: string, updates: { role?: string; subscription?: string }) {
    try {
      setUpdatingUserId(userId);
      const res = await fetch('/api/admin/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...updates }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to update user');
        return;
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                role: updates.role !== undefined ? updates.role : u.role,
                subscription: updates.subscription !== undefined ? updates.subscription : u.subscription,
              }
            : u
        )
      );
    } catch (err: any) {
      alert(err?.message || 'Update failed');
    } finally {
      setUpdatingUserId(null);
    }
  }

  async function handleQuickGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!grantEmail.trim()) return;

    try {
      setGrantLoading(true);
      setGrantStatus(null);
      const res = await fetch('/api/admin/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: grantEmail.trim(),
          role: grantRole,
          subscription: grantPlan,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to grant permissions');
      }

      setGrantStatus({
        type: 'success',
        message: `Successfully updated ${grantEmail}: Role=${grantRole.toUpperCase()}, Plan=${grantPlan.toUpperCase()}`,
      });
      setGrantEmail('');
      fetchUsers();
    } catch (err: any) {
      setGrantStatus({
        type: 'error',
        message: err?.message || 'Failed to update user',
      });
    } finally {
      setGrantLoading(false);
    }
  }

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.email.toLowerCase().includes(q) ||
      u.name.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.subscription.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (filterPlan === 'all') return true;
    if (filterPlan === 'admin') return u.role === 'admin';
    return u.subscription === filterPlan;
  });

  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === 'admin' || u.email.toLowerCase() === ROOT_ADMIN_EMAIL).length;
  const totalPaid = users.filter((u) => ['pro', 'enterprise', 'basic'].includes(u.subscription)).length;
  const totalFree = users.filter((u) => !u.subscription || u.subscription === 'free').length;

  if (!isLoaded || loading) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center bg-[#070314] text-purple-200">
        <div className="w-10 h-10 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono uppercase tracking-wider text-purple-400">Loading Administrator Console...</p>
      </div>
    );
  }

  if (error && !isAdmin) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-[#070314] px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e0624] border border-rose-500/30 text-center shadow-[0_0_50px_rgba(244,63,94,0.2)]">
          <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto mb-4 text-rose-400 text-2xl font-bold">
            🛡️
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Restricted Access</h1>
          <p className="text-xs text-rose-300 mb-6 leading-relaxed">{error}</p>
          <Link
            href="/"
            className="min-h-11 inline-block py-2.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070314] text-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sovereign Admin Gateway</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>User &amp; Permission Command Center</span>
            </h1>
            <p className="text-xs text-muted mt-1">
              Logged in as <strong className="text-white">{currentUserEmail}</strong> {isSuperadmin ? '(Superadmin Owner)' : '(Administrator)'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="min-h-11 py-2 px-4 rounded-xl bg-[#0e0624] border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white hover:bg-purple-900/40 transition-colors flex items-center gap-2"
            >
              <span>↻</span>
              <span>Refresh Directory</span>
            </button>
            <Link
              href="/"
              className="min-h-11 py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Back to Site →
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0d0622] border border-purple-500/25">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono">Total Users</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{totalUsers}</div>
            <span className="text-[10px] text-muted mt-1 block">Registered in Clerk</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0622] border border-purple-500/25">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono">Administrators</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 mt-1">{totalAdmins}</div>
            <span className="text-[10px] text-emerald-400 mt-1 block">Full access rights</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0622] border border-purple-500/25">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono">Paid Members</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">{totalPaid}</div>
            <span className="text-[10px] text-emerald-400/60 mt-1 block">Pro &amp; Enterprise tiers</span>
          </div>
          <div className="p-5 rounded-2xl bg-[#0d0622] border border-purple-500/25">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono">Free Users</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-300 mt-1">{totalFree}</div>
            <span className="text-[10px] text-muted mt-1 block">Free plan registered</span>
          </div>
        </div>

        {/* Quick Grant Form */}
        <div className="p-6 rounded-3xl bg-[#0e0624] border border-purple-500/35 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>⚡</span>
              <span>Quick Role &amp; Plan Assignment</span>
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Type any registered user&apos;s email address to instantly assign Admin permissions or upgrade/downgrade their subscription plan.
            </p>
          </div>

          <form onSubmit={handleQuickGrant} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-mono text-purple-300 mb-1.5 uppercase tracking-wider">
                User Email Address
              </label>
              <input
                type="email"
                required
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#070314] border border-purple-500/30 text-white text-xs placeholder:text-muted focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-purple-300 mb-1.5 uppercase tracking-wider">
                Role
              </label>
              <select
                value={grantRole}
                onChange={(e) => setGrantRole(e.target.value as any)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#070314] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="admin">Admin (Full Control)</option>
                <option value="user">Standard User</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-purple-300 mb-1.5 uppercase tracking-wider">
                Plan
              </label>
              <select
                value={grantPlan}
                onChange={(e) => setGrantPlan(e.target.value as any)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-[#070314] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
              >
                <option value="pro">Pro (€10/mo tier)</option>
                <option value="enterprise">Enterprise (€29.99/mo tier)</option>
                <option value="basic">Basic (€3/mo tier)</option>
                <option value="free">Free Tier</option>
              </select>
            </div>

            <div className="md:col-span-4 flex justify-end pt-1">
              <button
                type="submit"
                disabled={grantLoading}
                className="min-h-11 py-2.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 transition-all cursor-pointer"
              >
                {grantLoading ? 'Updating Permissions...' : 'Apply Role & Plan →'}
              </button>
            </div>
          </form>

          {grantStatus && (
            <div
              className={`mt-4 p-3 rounded-xl text-xs font-mono border ${
                grantStatus.type === 'success'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
              }`}
            >
              {grantStatus.message}
            </div>
          )}
        </div>

        {/* Directory Search & Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by email, name, role..."
                className="w-full py-2 px-3.5 pl-9 rounded-xl bg-[#0e0624] border border-purple-500/30 text-white text-xs placeholder:text-muted focus:outline-none focus:border-purple-400"
              />
              <span className="absolute left-3 top-2.5 text-purple-400 text-xs">🔍</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-muted font-mono text-[11px] mr-1">Filter:</span>
              {[
                { id: 'all', label: 'All Users' },
                { id: 'admin', label: 'Admins Only' },
                { id: 'pro', label: 'Pro' },
                { id: 'enterprise', label: 'Enterprise' },
                { id: 'free', label: 'Free' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => setFilterPlan(chip.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    filterPlan === chip.id
                      ? 'bg-purple-600 text-white font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : 'bg-[#0e0624] text-muted hover:text-white border border-purple-500/20'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto rounded-2xl border border-purple-500/25 bg-[#0d0622]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070314] border-b border-purple-500/20 text-muted font-mono uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email Address</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Subscription Plan</th>
                  <th className="py-3 px-4">Registered</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/15">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted">
                      No users match the active filter or search query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const isUserSuperadmin = u.email.toLowerCase() === ROOT_ADMIN_EMAIL;
                    const isRowAdmin = u.role === 'admin' || isUserSuperadmin;
                    const isUpdating = updatingUserId === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            {u.imageUrl ? (
                              <img
                                src={u.imageUrl}
                                alt={u.name}
                                className="w-7 h-7 rounded-full object-cover border border-purple-500/30"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-purple-900/60 text-purple-200 border border-purple-500/30 flex items-center justify-center font-bold text-[10px]">
                                {u.name[0]?.toUpperCase() || 'U'}
                              </div>
                            )}
                            <div>
                              <div className="font-semibold text-white flex items-center gap-1.5">
                                <span>{u.name}</span>
                                {isUserSuperadmin && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                                    OWNER
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-muted">{u.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-purple-200">
                          {u.email}
                        </td>

                        <td className="py-3.5 px-4">
                          {isRowAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                              <span>🛡️</span>
                              <span>ADMIN</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-raised text-zinc-300 text-[10px] font-mono">
                              USER
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            disabled={isUpdating}
                            value={u.subscription}
                            onChange={(e) => handleUpdateUser(u.id, { subscription: e.target.value })}
                            className={`py-1 px-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border focus:outline-none cursor-pointer ${
                              u.subscription === 'pro'
                                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                                : u.subscription === 'enterprise'
                                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                                : u.subscription === 'basic'
                                ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                                : 'bg-raised border-line text-muted'
                            }`}
                          >
                            <option value="free">Free</option>
                            <option value="basic">Basic (€3)</option>
                            <option value="pro">Pro (€10)</option>
                            <option value="enterprise">Enterprise (€29.99)</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-muted font-mono text-[11px]">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {isUserSuperadmin ? (
                            <span className="text-[10px] text-muted font-mono italic">Primary Owner</span>
                          ) : (
                            <button
                              disabled={isUpdating}
                              onClick={() => handleUpdateUser(u.id, { role: isRowAdmin ? 'user' : 'admin' })}
                              className={`py-1 px-3 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                                isRowAdmin
                                  ? 'bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25'
                                  : 'bg-purple-600/20 border border-purple-500/40 text-purple-200 hover:bg-purple-600 hover:text-white'
                              }`}
                            >
                              {isUpdating ? '...' : isRowAdmin ? 'Revoke Admin' : 'Make Admin'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
