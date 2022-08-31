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
        <v-card prepend-icon="fa fa-user" class="pa-5">
          <template v-slot:title> Administración de usuarios </template>
          <template v-slot:subtitle> Listado de usuarios del sistema </template>
          <datatable-component :headers="headers" :get-data="users.getUsers">
            <template v-slot:[`item.actions`]>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    color="primary"
                    dark
                    class="ma-2"
                    prepend-icon="fa fa-caret-down"
                  >
                    Acciones
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item prepend-icon="fa fa-eye" title="Ver">
                  </v-list-item>
                  <v-list-item prepend-icon="fa fa-edit" title="Editar">
                  </v-list-item>
                  <v-list-item prepend-icon="fa fa-user-check" title="Activar">
                  </v-list-item>
                  <v-list-item
                    prepend-icon="fa fa-key"
                    title="Cambiar contraseña"
                  >
                  </v-list-item>
                  <v-divider> </v-divider>
                  <v-list-item prepend-icon="fa fa-trash" title="Eliminar">
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </datatable-component>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "@vue/reactivity";
import DatatableComponent from "@/components/DatatableComponent.vue";
import users from "@/services/users.service";

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
  { text: "Nombre", value: "firstname", aling: "left" },
  { text: "Apellido", value: "lastname" },
  { text: "Nombre de usuario", value: "username" },
  { text: "Correo", value: "email" },
  { text: "Acciones", value: "actions" },
]);
</script>
