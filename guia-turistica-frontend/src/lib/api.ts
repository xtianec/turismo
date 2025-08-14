import axios, { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

// Ensure baseURL always matches backend origin and has no trailing slash
const baseURL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

const api = axios.create({
  baseURL,
});

// Automatically retry idempotent requests with exponential backoff
const MAX_RETRIES = 3;

function shouldRetry(error: AxiosError, retryCount: number) {
  const status = error.response?.status;
  // Retry on network errors or 5xx responses
  return (
    (!status || status >= 500) &&
    retryCount < MAX_RETRIES &&
    error.config?.method?.toLowerCase() === 'get'
  );
}

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const cfg = error.config as (AxiosRequestConfig & { __retryCount?: number }) | undefined;
    if (!cfg) throw error;

    cfg.__retryCount = (cfg.__retryCount ?? 0) + 1;
    if (!shouldRetry(error, cfg.__retryCount)) throw error;

    const delay = 300 * 2 ** (cfg.__retryCount - 1);
    await new Promise((r) => setTimeout(r, delay));
    return api(cfg);
  },
);

export default api;
