<template>
  <datatable-component
    ref="dataTable"
    :headers="headers"
    :get-data="usersServices.getUsers"
  >
    <template v-slot:[`item.is_active`]="{ item }">
      <v-chip v-if="item.is_active" class="ma-2 text-white" color="green">
        Activo
      </v-chip>
      <v-chip v-else class="ma-2 text-white" color="red"> Inactivo </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <user-action-button-component :user="item" @on-success="getUsers">
      </user-action-button-component>
    </template>
  </datatable-component>
</template>
<script setup lang="ts">
import DatatableComponent from "@/components/DatatableComponent.vue";
import usersServices from "@/services/users.service";
import { defineExpose, defineProps, ref } from "vue";
import UserActionButtonComponent from "./UserActionButtonComponent.vue";

const dataTable = ref<InstanceType<typeof DatatableComponent> | null>(null);

defineProps({
  refresh: {
    type: Boolean,
    default: false,
  },
});

const getUsers = () => {
  dataTable.value?.getData();
};

defineExpose({
  getUsers,
});

const headers = ref([
  { text: "Nombre", value: "firstname", width: "20%" },
  { text: "Apellido", value: "lastname", width: "20%" },
  { text: "Nombre de usuario", value: "username", width: "15%" },
  { text: "Correo", value: "email", width: "15%" },
  { text: "Grupo", value: "id_user_group", width: "10%" },
  { text: "Estado", value: "is_active", width: "10%" },
  { text: "Acciones", value: "actions", width: "10%" },
]);
</script>
