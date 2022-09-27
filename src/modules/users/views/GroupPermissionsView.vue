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
        <template v-slot:button>
          <v-btn
            block
            :loading="permissionsStore.updateLoading"
            prepend-icon="fa fa-save"
            class="ma-2"
            color="primary"
            dark
            @click="permissionsStore.updatePermissions"
            >Guardar</v-btn
          >
        </template>
      </general-card-component>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <!-- Dibujamos los permisos agrupados -->
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="permissionGroup in permissionsStore.permissions"
          :key="permissionGroup.id_permission"
        >
          <v-expansion-panel-title>
            {{ permissionGroup.group_tag }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <permission-group-component
              :permissionGroupId="permissionGroup.id_permission"
            ></permission-group-component>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
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
  permissionsStore.getInitialData(route.params.id as string);
});
</script>
