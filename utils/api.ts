export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

async function apiRequest(path: string, opts: RequestInit = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
  });

  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch {}

  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  if (data === null && text) {
    // server responded with HTML (e.g., 404 page) or non-JSON
    throw new Error("Invalid JSON from server");
  }
  return data;
}

export const authAPI = {
  async login(email: string, password: string) {
    return apiRequest("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};
