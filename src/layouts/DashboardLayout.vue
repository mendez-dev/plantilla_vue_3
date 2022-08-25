<template>
  <v-app id="inspire">
    <NavigationDrawer :rail="rail"></NavigationDrawer>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="rail = !rail"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <template v-slot:append>
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn color="" dark v-bind="props"> Juanito </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item @click="auth.logout()">
                <template v-slot:append>
                  <v-icon>fa fa-arrow-right-from-bracket</v-icon>
                </template>
                <v-list-item-title>
                  <span>Cerrar sesión</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const rail = ref(true);
const auth = useAuthStore();

auth.verify();
</script>

<style></style>
