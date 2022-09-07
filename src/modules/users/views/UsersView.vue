<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="breadcrumbs">
          <template v-slot:prepend>
            <v-icon class="mb-1" size="small" icon="fa fa-home"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <general-card-component
          title="Administración de usuarios"
          subtitle="Administración de usuarios del sistema"
          icon="fa fa-user"
        >
          <template v-slot:button>
            <user-form-component
              @onCreated="refreshTable"
            ></user-form-component>
          </template>
          <users-table-component ref="userTable"></users-table-component>
        </general-card-component>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import UsersTableComponent from "../components/UsersTableComponent.vue";
import GeneralCardComponent from "@/components/GeneralCardComponent.vue";
import UserFormComponent from "../components/UserFormComponent.vue";

const userTable = ref<InstanceType<typeof UsersTableComponent> | null>(null);

const refreshTable = () => {
  userTable.value?.getUsers();
};

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
    text: "Administracion de usuarios",
    disabled: true,
    to: "/users/admin",
  },
]);
</script>
