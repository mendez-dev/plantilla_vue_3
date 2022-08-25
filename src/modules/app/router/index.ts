import { RouteRecordRaw } from "vue-router";

const appRoutes: Array<RouteRecordRaw> = [
  {
    path: "/app_settings",
    name: "app_settings",
    component: () =>
      import(
        /* webpackChunkName: "appSettings" */ "../views/AppSettingsView.vue"
      ),
  },
];

export default appRoutes;
