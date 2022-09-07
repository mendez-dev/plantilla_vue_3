<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :fullscreen="display.xs.value"
      transition="dialog-center-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- Crear un slot para activar el cuadro de dialogo -->
        <slot :props="props"></slot>
      </template>
      <v-card
        :width="display.width.value > 800 ? 800 : display.width.value * 0.9"
      >
        <v-toolbar color="primary" dark>
          <v-card-title> Agregar usuario </v-card-title>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="outlined"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";
import { ref } from "@vue/reactivity";

const display = useDisplay();
const dialog = ref(false);
</script>
