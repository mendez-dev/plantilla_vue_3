<template>
  <v-btn
    ref="actionBtn"
    color="primary"
    dark
    class="ma-2"
    prepend-icon="fa fa-caret-down"
  >
    Acciones
    <v-menu ref="menu" activator="parent">
      <v-list>
        <v-list-item
          prepend-icon="fa fa-eye"
          @click="modalView = true"
          title="Ver"
        >
        </v-list-item>
        <v-list-item
          prepend-icon="fa fa-edit"
          @click="modalEdit = true"
          title="Editar"
        >
        </v-list-item>
        <confirmation-dialog-component
          v-if="user.is_active"
          title="¿Está seguro de desactivar este usuario?"
          :subtitle="`${user.firstname} ${user.lastname} `"
          icon="fa fa-user-slash"
          color="red"
          v-slot="{ props }"
          @on-confirm="
            deactivateUser(user.id_user);
            actionBtn.$el.click();
          "
          @on-cancel="actionBtn.$el.click()"
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
          v-if="!user.is_active"
          title="¿Está seguro de activar este usuario?"
          :subtitle="`${user.firstname} ${user.lastname} `"
          icon="fa fa-check"
          color="green"
          v-slot="{ props }"
          @on-confirm="
            activateUser(user.id_user);
            actionBtn.$el.click();
          "
          @on-cancel="actionBtn.$el.click()"
        >
          <v-list-item
            class="text-left"
            v-bind="props"
            prepend-icon="fa fa-key"
            title="Activar"
          >
          </v-list-item>
        </confirmation-dialog-component>
        <v-list-item
          @click="modalChangePassword = true"
          prepend-icon="fa fa-key"
          title="Cambiar contraseña"
        >
        </v-list-item>
        <v-divider> </v-divider>
        <confirmation-dialog-component
          title="¿Está seguro eliminar este usuario?"
          :subtitle="`${user.firstname} ${user.lastname} `"
          icon="fa fa-trash"
          color="red"
          v-slot="{ props }"
          @on-confirm="
            removeUser(user.id_user);
            actionBtn.$el.click();
          "
          @on-cancel="actionBtn.$el.click()"
        >
          <v-list-item
            class="text-left"
            v-bind="props"
            prepend-icon="fa fa-trash"
            title="Eliminar"
          >
          </v-list-item>
        </confirmation-dialog-component>
      </v-list>
    </v-menu>

    <!-- Modal para ver la información del usuario -->
    <div class="text-center">
      <v-dialog
        :width="
          display.xs.value
            ? null
            : display.width.value > 800
            ? 800
            : display.width.value * 0.9
        "
        :fullscreen="display.xs.value"
        v-model="modalView"
        transition="dialog-center-transition"
      >
        <user-view-component
          :id_user="user.id_user"
          v-model="modalView"
          @on-close="modalView = false"
        ></user-view-component>
      </v-dialog>
    </div>

    <!-- Modal para editar la información de un usuario -->
    <div class="text-center">
      <v-dialog
        :width="
          display.xs.value
            ? null
            : display.width.value > 800
            ? 800
            : display.width.value * 0.9
        "
        :fullscreen="display.xs.value"
        v-model="modalEdit"
        transition="dialog-center-transition"
      >
        <user-edit-component
          @on-success="$emit('on-success')"
          @on-close="modalEdit = false"
          :id_user="user.id_user"
        ></user-edit-component>
      </v-dialog>
    </div>

    <!-- Modal para cambiar la contraseña de un usuario -->
    <div class="text-center">
      <v-dialog
        :width="
          display.xs.value
            ? null
            : display.width.value > 800
            ? 800
            : display.width.value * 0.9
        "
        :fullscreen="display.xs.value"
        v-model="modalChangePassword"
        transition="dialog-center-transition"
      >
        <user-change-password-component
          @on-success="$emit('on-success')"
          @on-close="modalChangePassword = false"
          :id_user="user.id_user"
        ></user-change-password-component>
      </v-dialog>
    </div>
  </v-btn>
</template>
<script setup lang="ts">
// Importación de librerías de terceros
import { defineProps, ref, defineEmits, watch } from "vue";
import { useDisplay } from "vuetify";

// Importación de modelos
import User from "@/models/User/User";

// Importación de componentes
import { Alert, AlertType } from "@/plugins/Alert";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent.vue";
import UserEditComponent from "@/modules/users/components/UserEditComponent.vue";
import UserViewComponent from "@/modules/users/components/UserViewComponent.vue";
import UserChangePasswordComponent from "@/modules/users/components/UserChangePasswordComponent.vue";
import { VBtn } from "vuetify/lib/components";
import { VMenu } from "vuetify/lib/components";

// Importación de servicios
import usersServices from "@/services/users.service";
defineProps({
  user: {
    type: Object as () => User,
    required: true,
  },
});

const display = useDisplay();

// Variables reactivas
const modalView = ref(false);
const modalEdit = ref(false);
const modalChangePassword = ref(false);

const actionBtn = ref<InstanceType<typeof VBtn> | null>(null);
const menu = ref<InstanceType<typeof VMenu> | null>(null);

const deactivateUser = async (id_user: string) => {
  const response = await usersServices.disable(id_user);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Usuario desactivado correctamente",
    });
    // Recargar la tabla por medio de un evento
    emit("on-success");
  }
};

const activateUser = async (id_user: string) => {
  const response = await usersServices.enable(id_user);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Usuario activado correctamente",
    });
    // Recargar la tabla por medio del evento
    emit("on-success");
  }
};

const removeUser = async (id_user: string) => {
  const response = await usersServices.remove(id_user);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Usuario eliminado correctamente",
    });
    // Recargar la tabla por medio del evento
    emit("on-success");
  }
};

const emit = defineEmits(["on-success"]);
</script>
<style></style>
