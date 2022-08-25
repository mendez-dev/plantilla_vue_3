<template>
  <v-container>
    <v-row>
      <v-col cols="12"><v-breadcrumbs :items="items"></v-breadcrumbs> </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-card>
          <v-card-item prepend-icon="fa fa-mobile-screen-button">
            <v-card-title>Ajustes de la aplicación</v-card-title>

            <v-card-subtitle>Personaliza la aplicación</v-card-subtitle>
          </v-card-item>
          <v-divider></v-divider>
          <v-card-text class="pa-10">
            <v-form>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    variant="underlined"
                    label="Nombre de la aplicacion"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field variant="underlined" label="Divisa">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field variant="underlined" label="IVA">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color primario"
                    v-model="primaryColor"
                  />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput label="Color primario (Modo oscuro)" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput label="Color secundario" />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput label="Color secundario (Modo oscuro)" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput label="Color de acento" />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput label="Color de acento (Modo oscuro)" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput label="Color de fondo" />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput label="Color de fondo (Modo oscuro)" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ColorPickerInput from "@/components/ColorPickerInput.vue";
import { ref } from "@vue/reactivity";

const primaryColor = ref("#1976D2");

const items = ref([
  {
    text: "Dashboard",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    text: "Link 1",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    text: "Link 2",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
]);
</script>
