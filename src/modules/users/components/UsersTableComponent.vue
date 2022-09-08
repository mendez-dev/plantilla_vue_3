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
      <v-btn
        ref="actionBtn"
        color="primary"
        dark
        class="ma-2"
        prepend-icon="fa fa-caret-down"
      >
        Acciones
        <v-menu activator="parent">
          <!-- <template v-slot:activator="{ props }"> -->
          <!-- </template> -->

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
            <confirmation-dialog-component
              v-if="item.is_active"
              title="¿Está seguro de desactivar este usuario?"
              :subtitle="`${item.firstname} ${item.lastname} `"
              icon="fa fa-user-slash"
              color="red"
              v-slot="{ props }"
              @onConfirm="deactivateUser(item.id_user)"
            >
              <v-list-item
                class="text-left"
                v-bind="props"
                prepend-icon="fa fa-user-slash"
                title="Desactivar"
              >
              </v-list-item>
            </confirmation-dialog-component>
            <confirmation-dialog-component
              v-if="!item.is_active"
              title="¿Está seguro de activar este usuario?"
              :subtitle="`${item.firstname} ${item.lastname} `"
              icon="fa fa-check"
              color="green"
              v-slot="{ props }"
              @onConfirm="activateUser(item.id_user)"
            >
              <v-list-item
                class="text-left"
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
      </v-btn>
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
import usersServices from "@/services/users.service";
import { defineExpose, defineProps, ref } from "vue";
import { useDisplay } from "vuetify";
import UserEditComponent from "./UserEditComponent.vue";
import UserViewComponent from "./UserViewComponent.vue";
import { Alert, AlertType } from "../../../plugins/Alert";

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

const deactivateUser = async (id_user: string) => {
  // Cerrar el menu de acciones del usuario

  const response = await usersServices.disable(id_user);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Usuario desactivado correctamente",
    });
    // Recargar la tabla
    dataTable.value?.getData();
  }
};

const activateUser = async (id_user: string) => {
  const response = await usersServices.enable(id_user);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Usuario activado correctamente",
    });
    // Recargar la tabla
    dataTable.value?.getData();
  }
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
