<template>
  <!-- Breadcrumbs -->
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:prepend>
          <v-icon class="mb-1" size="small" icon="fa fa-home"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>

  <!-- card -->
  <v-row v-if="!permissionsStore.loading">
    <v-col cols="12">
      <general-card-component
        title="Gestion de permisos de grupo"
        :subtitle="`Gestion de permisos de grupo ${permissionsStore.group?.name}`"
        icon="fa fa-shield-halved"
      >
        <!-- Dibujamos los permisos agrupados -->
        <permission-group-component
          v-for="permissionGroup in permissionsStore.permissions"
          :key="permissionGroup.id_permission"
          :permissionGroupId="permissionGroup.id_permission"
        ></permission-group-component>
      </general-card-component>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import GeneralCardComponent from "@/components/GeneralCardComponent.vue";
import PermissionGroupComponent from "@/modules/users/components/PermissionGroupComponent.vue";
import { usePermissionsStore } from "../stores/permissions/index";
import { useRoute } from "vue-router";

const route = useRoute();

const permissionsStore = usePermissionsStore();

// Definimos las breadcrumbs
const breadcrumbs = ref([
  {
    text: "Inicio",
    disabled: false,
    to: "/",
  },
  {
    text: "Módulo usuarios",
    disabled: false,
    to: "/users",
  },
  {
    text: "Grupos de usuarios",
    disabled: false,
    to: "/groups",
  },
  {
    text: "Gestion de permisos",
    disabled: true,
    to: "groups",
  },
]);

onMounted(() => {
  permissionsStore.getGroup(route.params.id as string);
  permissionsStore.getPermissions();
});
</script>
