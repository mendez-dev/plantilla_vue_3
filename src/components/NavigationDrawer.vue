<template>
  <v-navigation-drawer v-model="drawer" permanent :rail="rail" app>
    <template v-slot:prepend>
      <v-list-item
        height="65"
        two-line
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        title="Jane Smith"
        subtitle="Logged in"
      ></v-list-item>
    </template>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        @click="$router.push('/app_settings')"
        prepend-icon="fa fa-mobile-screen-button"
        title="Aplicación"
        subtitle="Ajustes de la aplicación"
        value="starred"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
// Importaciones --------------------------
import { computed, defineProps } from "vue";
import { useDisplay } from "vuetify";

/* Creamos una instancia del Display API de Vuetify 3
 * para acceder a la información de la pantalla
 */
const display = useDisplay();

const props = defineProps({
  rail: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

/* Si el tamaño de la pantalla es menor a sm se cambia el comportamiento
 * del menú ocultandolo en lugar de cambiar a rail
 */
const drawer = computed(() => {
  if (display.xs.value || display.sm.value) {
    return !props.rail;
  }
  return true;
});
</script>

<style></style>
