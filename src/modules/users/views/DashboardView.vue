<template>
  <v-container>
    <v-row>
      <v-col cols="12"
        ><v-breadcrumbs :items="breadcrumbs">
          <template v-slot:prepend>
            <v-icon
              class="mb-1"
              size="small"
              icon="fa fa-home"
            ></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="4" xl="3">
        <DashboardCard
          header-text="Administración de"
          main-text="Usuarios"
          button-text="Administrar"
          icon="fa fa-user"
          @onClick="$router.push({ name: 'users-admin' })"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="4" xl="3">
        <DashboardCard
          header-text="Administración de"
          main-text="Grupos de usuarios"
          button-text="Administrar"
          icon="fa fa-users"
          @onClick="$router.push({ name: 'groups' })"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import DashboardCard from "@/components/DashboardCardComponent.vue";
import { ref } from "@vue/reactivity";

const breadcrumbs = ref([
  {
    text: "Inicio",
    disabled: false,
    to: "/",
  },
  {
    text: "Módulo usuarios",
    disabled: true,
    to: "/users",
  },
]);
</script>
