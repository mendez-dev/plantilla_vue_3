import { RouteRecordRaw } from "vue-router";

const usersRoutes: Array<RouteRecordRaw> = [
  {
    path: "/users",
    name: "users",
    component: () =>
      import(
        /* webpackChunkName: "appSettings" */ "../views/DashboardView.vue"
      ),
  },
  {
    path: "/users/admin",
    name: "users-admin",
    component: () =>
      import(/* webpackChunkName: "appSettings" */ "../views/UsersView.vue"),
  },
];

export default usersRoutes;
