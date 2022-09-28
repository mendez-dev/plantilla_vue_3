<template>
  <v-card>
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      height="10"
      indeterminate
    ></v-progress-linear>
    <v-toolbar color="primary" dark>
      <v-card-title> Información del grupo </v-card-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-list-item title="Nombre" :subtitle="group?.name"> </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list-item title="Descripción" :subtitle="group?.description">
          </v-list-item>
        </v-col>
      </v-row>
      <v-divider class="my-5"> </v-divider>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="permission in permissions"
          :key="permission.id_permission"
        >
          <v-expansion-panel-title>
            {{ permission.group_tag }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item
                  :prepend-icon="permission.icon"
                  title="Nombre"
                  :subtitle="permission.label"
                >
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item
                  title="Descripción"
                  :subtitle="permission.description"
                >
                </v-list-item>
              </v-col>
            </v-row>
            <v-row
              v-for="child in permission.children"
              :key="child.id_permission"
            >
              <v-col cols="12" sm="6">
                <v-list-item
                  :prepend-icon="child.icon"
                  title="Nombre"
                  :subtitle="child.label"
                >
                </v-list-item>
              </v-col>
              <v-col cols="12" sm="6">
                <v-list-item title="Descripción" :subtitle="child.description">
                </v-list-item>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="outlined" text @click="$emit('onClose')">
        Cerrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps, ref, Ref, defineEmits, onMounted } from "vue";
import Group from "@/models/Group/Group";
import groupsService from "@/services/GroupService";
import Permission from "@/models/Group/Permission";

const props = defineProps({
  id_user_group: {
    type: String,
    required: true,
  },
});

const loading: Ref<boolean> = ref(false);
const group: Ref<Group | null> = ref(null);
const permissions: Ref<Permission[]> = ref([]);
defineEmits(["onClose"]);

onMounted(async () => {
  loading.value = true;
  const response = await groupsService.get(props.id_user_group);
  if (response.status === 200) {
    group.value = Group.fromJson(JSON.stringify(response.data));
    if (group.value.permissions !== null) {
      // Obtenemos los permisos padre del grupo y luego asignamos sus respectivos hijos
      const permissionsParent = group.value.permissions!.filter(
        (permission) => permission.depends_on === null
      );
      permissionsParent.forEach((permissionParent) => {
        permissionParent.children = group.value!.permissions!.filter(
          (permission) =>
            permission.depends_on === permissionParent.id_permission
        );
      });

      permissions.value.push(...permissionsParent);
    }
  }
  loading.value = false;
});
</script>
