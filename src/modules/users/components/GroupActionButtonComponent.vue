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
          prepend-icon="fa fa-shield-halved"
          title="Asignar permisos"
          @click="
            $router.push({
              name: 'group-permissions',
              params: { id: group.id_user_group },
            })
          "
        >
        </v-list-item>
        <confirmation-dialog-component
          v-if="group.is_active"
          title="¿Está seguro de desactivar este grupo?"
          :subtitle="group.name"
          icon="fa fa-user-slash"
          color="red"
          v-slot="{ props }"
          @on-confirm="
            disable(group.id_user_group);
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
          v-if="!group.is_active"
          title="¿Está seguro de activar este grupo?"
          :subtitle="group.name"
          icon="fa fa-check"
          color="green"
          v-slot="{ props }"
          @on-confirm="
            enable(group.id_user_group);
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
        <v-divider> </v-divider>
        <confirmation-dialog-component
          title="¿Está seguro eliminar este grupo?"
          :subtitle="group.name"
          icon="fa fa-trash"
          color="red"
          v-slot="{ props }"
          @on-confirm="
            remove(group.id_user_group);
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
  </v-btn>
</template>
<script setup lang="ts">
// Importación de librerías de terceros
import { defineProps, ref, defineEmits } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

// Importación de modelos
import Group from "@/models/Group/Group";

// Importación de componentes
import { Alert, AlertType } from "@/plugins/Alert";
import ConfirmationDialogComponent from "@/components/ConfirmationDialogComponent.vue";
import { VBtn, VMenu } from "vuetify/lib/components";

// Importación de servicios
import GroupService from "@/services/GroupService";

defineProps({
  group: {
    type: Object as () => Group,
    required: true,
  },
});

const display = useDisplay();

// Variables reactivas
const modalView = ref(false);
const modalEdit = ref(false);

const actionBtn = ref<InstanceType<typeof VBtn> | null>(null);
const menu = ref<InstanceType<typeof VMenu> | null>(null);

// Funciones para activar, desactivar y eliminar un grupo
const enable = async (id_user_group: string) => {
  const response = await GroupService.enable(id_user_group);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Grupo activado correctamente",
    });
  }

  emit("on-success");
};

const disable = async (id_user_group: string) => {
  const response = await GroupService.disable(id_user_group);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Grupo desactivado correctamente",
    });
  }

  emit("on-success");
};

const remove = async (id_user_group: string) => {
  const response = await GroupService.remove(id_user_group);
  if (response.status === 200) {
    Alert.show({
      type: AlertType.Success,
      message: "Grupo eliminado correctamente",
    });
  }

  emit("on-success");
};

// Emits
const emit = defineEmits(["on-success"]);
</script>
