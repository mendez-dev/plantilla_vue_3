<template>
  <datatable-component
    ref="datatable"
    :getData="groups.getPaginated"
    :headers="headers"
  >
    <template v-slot:[`item.is_active`]="{ item }">
      <v-chip v-if="item.is_active" class="ma-2 text-white" color="green">
        Activo
      </v-chip>
      <v-chip v-else class="ma-2 text-white" color="red"> Inactivo </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <group-action-button-component :group="item" @on-success="updateTable">
      </group-action-button-component>
    </template>
  </datatable-component>
</template>
<script setup lang="ts">
import DatatableComponent from "@/components/DatatableComponent.vue";
import GroupActionButtonComponent from "@/modules/users/components/GroupActionButtonComponent.vue";
import groups from "@/services/GroupService";
import { ref, defineExpose } from "vue";

const datatable = ref<InstanceType<typeof DatatableComponent> | null>(null);

const headers = [
  {
    text: "Nombre",
    value: "name",
    align: "left",
    width: "25%",
  },
  {
    text: "Descripción",
    value: "description",
    align: "left",
    width: "55%",
  },
  {
    text: "Estado",
    value: "is_active",
    align: "center",
    width: "10%",
  },
  {
    text: "Acciones",
    value: "actions",
    align: "center",
    width: "10%",
  },
];

const updateTable = () => {
  datatable.value?.getData();
};

defineExpose({
  updateTable,
});
</script>
