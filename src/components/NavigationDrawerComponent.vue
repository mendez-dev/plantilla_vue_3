<template>
  <v-navigation-drawer
    v-model="drawer"
    :width="width"
    :permanent="permanent"
    :rail="rail"
    app
  >
    <template v-slot:prepend>
      <v-list-item v-if="display.xs.value">
        <v-row class="justify-end">
          <v-col class="d-flex justify-end" xs="2">
            <v-icon color="grey" size="16" @click="$emit('closeEvent')"
              >fa fa-close</v-icon
            >
          </v-col>
        </v-row>
      </v-list-item>

      <v-container>
        <v-img
          class="mx-auto"
          :aspect-ratio="1"
          cover
          width="150"
          src="../assets/logo.png"
        ></v-img>
      </v-container>
    </template>

    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item
        @click="
          $router.push('/app_settings');
          $emit('closeEvent');
        "
        prepend-icon="fa fa-mobile-screen-button"
        title="Aplicación"
        value="/app_settings"
        subtitle="Ajustes de la aplicación"
      ></v-list-item>

      <v-list-item
        @click="
          $router.push('/users');
          $emit('closeEvent');
        "
        prepend-icon="fa fa-users"
        title="Usuarios"
        value="true"
        subtitle="Administración de usuarios"
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

const permanent = computed(() => {
  if (display.xs.value) {
    return false;
  }
  return true;
});

const width = computed(() => {
  if (display.xs.value) {
    return display.width.value;
  }
  return "300";
});
</script>

<style></style>
