<template>
  <datatable-component
    ref="dataTable"
    :headers="headers"
    :get-data="users.getUsers"
  >
    <template v-slot:[`item.is_active`]="{ item }">
      <v-chip v-if="item.is_active" class="ma-2 text-white" color="green">
        Activo
      </v-chip>
      <v-chip v-else class="ma-2 text-white" color="red"> Inactivo </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
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
          <v-list-item
            prepend-icon="fa fa-eye"
            @click="showUserModal(item.id_user)"
            title="Ver"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="fa fa-edit"
            @click="showEditModal(item.id_user)"
            title="Editar"
          >
          </v-list-item>
          <confirmation-dialog-component v-slot="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="fa fa-key"
              title="Activar"
            >
            </v-list-item>
          </confirmation-dialog-component>
          <v-list-item prepend-icon="fa fa-key" title="Cambiar contraseña">
          </v-list-item>
          <v-divider> </v-divider>
          <v-list-item prepend-icon="fa fa-trash" title="Eliminar">
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </datatable-component>

  <!-- Modal para ver la información del usuario -->
  <div class="text-center">
    <v-dialog
      :fullscreen="display.xs.value"
      v-model="modalView"
      transition="dialog-center-transition"
    >
      <user-view-component
        :id_user="id_user"
        v-model="modalView"
        @on-close="modalView = false"
      ></user-view-component>
    </v-dialog>
  </div>

  <!-- Modal para editar la información de un usuario -->
  <div class="text-center">
    <v-dialog
      :fullscreen="display.xs.value"
      v-model="modalEdit"
      transition="dialog-center-transition"
    >
      <user-edit-component
        @on-close="modalEdit = false"
        @on-success="getUsers"
        :id_user="id_user"
      ></user-edit-component>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import DatatableComponent from "@/components/DatatableComponent.vue";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent.vue";
import users from "@/services/users.service";
import { defineExpose, defineProps, ref } from "vue";
import { useDisplay } from "vuetify";
import UserEditComponent from "./UserEditComponent.vue";
import UserViewComponent from "./UserViewComponent.vue";

const display = useDisplay();

const dataTable = ref<InstanceType<typeof DatatableComponent> | null>(null);

defineProps({
  refresh: {
    type: Boolean,
    default: false,
  },
});

const modalView = ref(false);
const modalEdit = ref(false);

// ID del usuario que se está viendo o editando
const id_user = ref("");

const showUserModal = (value: string) => {
  modalView.value = true;
  id_user.value = value;
};

const showEditModal = (value: string) => {
  modalEdit.value = true;
  id_user.value = value;
};

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
