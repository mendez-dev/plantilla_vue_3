import { RouteRecordRaw } from "vue-router";

const usersRoutes: Array<RouteRecordRaw> = [
  {
    path: "/users",
    name: "users",
    component: () =>
      import(
        /* webpackChunkName: "usersDashboard" */ "../views/DashboardView.vue"
      ),
  },
  {
    path: "/users/admin",
    name: "users-admin",
    component: () =>
      import(/* webpackChunkName: "users" */ "../views/UsersView.vue"),
  },
  {
    path: "/groups",
    name: "groups",
    component: () =>
      import(/* webpackChunkName: "groups" */ "../views/GroupsView.vue"),
  },
  {
    path: "/group-permissions/:id",
    name: "group-permissions",
    component: () =>
      import(
        /* webpackChunkName: "groups" */ "../views/GroupPermissionsView.vue"
      ),
  },
];

export default usersRoutes;
