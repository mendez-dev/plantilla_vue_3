import appRoutes from "@/modules/app/router";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardLayout from "../layouts/DashboardLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [...appRoutes],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !localStorage.getItem("token")) next("/login");
  else if (!requiresAuth && localStorage.getItem("token")) next("/");
  else if (!requiresAuth && !localStorage.getItem("token")) next();
  else next();
});

export default router;
