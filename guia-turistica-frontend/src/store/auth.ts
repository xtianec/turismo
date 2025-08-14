import { defineStore } from 'pinia';
import api from '@/lib/api';

type Role = 'ADMIN'|'GUIDE'|'TOURIST';

export const useAuth = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    role: (localStorage.getItem('role') as Role | null) ?? null,
  }),
  getters: {
    isLogged: (s) => !!s.token,
    isGuide:  (s) => s.role === 'GUIDE',
  },
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password });
      this.token = data.token;
      localStorage.setItem('token', data.token);

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      this.role = payload.role;
      localStorage.setItem('role', this.role || '');
    },
    async register(p: { email: string; password: string; name: string; role: Role }) {
      await api.post('/auth/register', p);
    },
    logout() {
      this.token = null; this.role = null;
      localStorage.removeItem('token'); localStorage.removeItem('role');
    }
  }
});
