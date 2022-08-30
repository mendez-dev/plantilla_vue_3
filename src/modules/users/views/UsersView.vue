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
      <v-col cols="12">
        <v-card prepend-icon="fa fa-user">
          <template v-slot:title> Administración de usuarios </template>
          <template v-slot:subtitle> Listado de usuarios del sistema </template>
          <v-table> </v-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";

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

const headers = ref([
  { text: "Nombre", value: "name" },
  { text: "Email", value: "email" },
  { text: "Rol", value: "role" },
  { text: "Acciones", value: "actions" },
]);

const items = ref([]);
</script>
