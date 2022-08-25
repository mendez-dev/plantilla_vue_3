import { defineStore } from "pinia";
import Auth from "../../services/auth.service";
import User from "../../models/User/User";
import router from "../../router/index";

interface State {
  logged: boolean;
  loading: boolean;
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    logged: false,
    loading: false,
    user: null,
  }),
  actions: {
    async attemptLogin(username: string, password: string) {
      this.loading = true;

      const response = await Auth.login(username, password);

      if (response.status === 200) {
        this.logged = true;
        localStorage.setItem("token", response.data.token);
        router.push("/");
      }

      this.loading = false;
    },
    async verify() {
      try {
        const response = await Auth.verify();
        this.user = User.fromJson(JSON.stringify(response.data));
        this.logged = true;
      } catch (error) {
        this.logged = false;
        localStorage.removeItem("token");
        router.push("/login");
      }
    },
    logout() {
      this.logged = false;
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
