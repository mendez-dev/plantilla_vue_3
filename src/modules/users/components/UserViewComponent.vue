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
      <v-card-title> Información del usuario </v-card-title>
    </v-toolbar>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-list-item title="Nombre" :subtitle="user?.firstname">
          </v-list-item>
        </v-col>
        <v-col cols="12" sm="6">
          <v-list-item title="Apellido" :subtitle="user?.lastname">
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-list-item title="Correo" :subtitle="user?.email"> </v-list-item>
        </v-col>
        <v-col cols="12" sm="6">
          <v-list-item title="Nombre de usuario" :subtitle="user?.username">
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-list-item title="Grupo" :subtitle="user?.id_user_group">
          </v-list-item>
        </v-col>
      </v-row>
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
import usersService from "@/services/users.service";
import User from "@/models/User/User";

const props = defineProps({
  id_user: {
    type: String,
    required: true,
  },
});

const loading: Ref<boolean> = ref(false);
const user: Ref<User | null> = ref(null);

defineEmits(["onClose"]);

onMounted(async () => {
  loading.value = true;
  const response = await usersService.get(props.id_user);
  if (response.status === 200) {
    user.value = User.fromJson(JSON.stringify(response.data));
  }
  loading.value = false;
});
</script>
