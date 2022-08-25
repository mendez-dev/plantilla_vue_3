<template>
  <v-app>
    <v-main>
      <!-- Notificación -->
      <SnackbarComponent />

      <!-- Router view principal -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SnackbarComponent from "./components/SnackbarComponent.vue";
</script>

<style></style>
