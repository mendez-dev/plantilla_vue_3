<template>
  <v-row>
    <v-col class="py-0" cols="12">
      <v-switch
        color="primary"
        v-model="permissionsStore.permissions.find(
          (p) => p.id_permission === permissionGroupId
        )!.selected"
        :prepend-icon="permissionsStore.permissions.find(
          (p) => p.id_permission === permissionGroupId
        )!.icon"
        :label="permissionsStore.permissions.find(
          (p) => p.id_permission === permissionGroupId
        )!.label"
      ></v-switch>
    </v-col>
  </v-row>
  <v-row class="py-0">
    <v-col
      class="py-0"
      cols="4"
      v-for="permission in permissionsStore.permissions.find(
          (p) => p.id_permission === permissionGroupId
        )!.children"
      v-bind:key="permission.id_permission"
    >
      <v-switch
        color="primary"
        v-model="permission.selected"
        :prepend-icon="permission.icon"
        :label="permission.label"
      ></v-switch>
    </v-col>
  </v-row>
  <v-divider class="mb-10"></v-divider>
</template>
<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import Permission from "@/models/Group/Permission";
import { usePermissionsStore } from "../stores/permissions/index";

const permissionsStore = usePermissionsStore();

defineProps({
  permissionGroupId: {
    type: String,
    required: true,
  },
});
</script>
