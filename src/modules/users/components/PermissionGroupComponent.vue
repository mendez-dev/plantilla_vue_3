<template>
  <v-row>
    <v-col cols="12">
      <v-switch :label="permissionGroup.label"></v-switch>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="3"
      v-for="permission in permissionGroup.children"
      v-bind:key="permission.id_permission"
    >
      <v-switch :label="permission.label"></v-switch>
    </v-col>
  </v-row>
  <v-divider class="mb-10"></v-divider>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import Permission from "@/models/Group/Permission";

defineProps({
  permissionGroup: {
    type: Permission,
    required: true,
  },
});
</script>
