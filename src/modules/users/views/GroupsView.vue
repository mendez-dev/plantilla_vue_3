<template>
  <v-container>
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
    <v-row>
      <v-col cols="12">
        <general-card-component
          title="Administración de grupos de usuarios"
          subtitle="Administración de grupos de usuarios del sistema"
          icon="fa fa-user"
        >
          <template v-slot:button>
            <group-form-component
              @on-created="updateTable"
            ></group-form-component
          ></template>
          <groups-table-component ref="groupTable"></groups-table-component>
        </general-card-component>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GeneralCardComponent from "@/components/GeneralCardComponent.vue";
import GroupsTableComponent from "../components/GroupsTableComponent.vue";
import GroupFormComponent from "../components/GroupFormComponent.vue";

const groupTable = ref<InstanceType<typeof GroupsTableComponent> | null>(null);

const updateTable = () => {
  groupTable.value?.updateTable();
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
    text: "Administración de grupos de usuarios",
    disabled: true,
    to: "groups",
  },
]);
</script>
