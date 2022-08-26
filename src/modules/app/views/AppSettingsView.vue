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
                    label="Nombre de la aplicación"
                    v-model="form.app_name"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.default_currency"
                    variant="underlined"
                    label="Divisa"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.default_tax"
                    variant="underlined"
                    label="IVA"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color primario"
                    v-model="form.main_color"
                  />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color primario (Modo oscuro)"
                    v-model="form.main_dark_color"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color secundario"
                    v-model="form.second_color"
                  />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color secundario (Modo oscuro)"
                    v-model="form.second_dark_color"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color de acento"
                    v-model="form.accent_dark_color"
                  />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color de acento (Modo oscuro)"
                    v-model="form.accent_dark_color"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color de fondo"
                    v-model="form.scaffold_color"
                  />
                </v-col>
                <v-col cols="6">
                  <ColorPickerInput
                    label="Color de fondo (Modo oscuro)"
                    v-model="form.scaffold_dark_color"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block variant="flat">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ColorPickerInput from "@/components/ColorPickerInput.vue";
import { ref, reactive, onMounted } from "vue";
import { useAppSettingsStore } from "@/stores/app_settings";

const appSettingsStore = useAppSettingsStore();
const form = reactive({
  id_settings: "",
  app_name: "",
  default_tax: 0.0,
  default_currency: "",
  main_color: "",
  main_dark_color: "",
  second_color: "",
  second_dark_color: "",
  accent_color: "",
  accent_dark_color: "",
  scaffold_color: "",
  scaffold_dark_color: "",
  created_by: "",
  created_at: "",
  updated_by: "",
  updated_at: "",
  deleted_by: "",
  deleted_at: "",
});

onMounted(async () => {
  await appSettingsStore.getAppSettings();
  if (appSettingsStore.appSettings) {
    form.id_settings = appSettingsStore.appSettings.id_settings;
    form.app_name = appSettingsStore.appSettings.app_name;
    form.default_tax = appSettingsStore.appSettings.default_tax;
    form.default_currency = appSettingsStore.appSettings.default_currency;
    form.main_color = appSettingsStore.appSettings.main_color;
    form.main_dark_color = appSettingsStore.appSettings.main_dark_color;
    form.second_color = appSettingsStore.appSettings.second_color;
    form.second_dark_color = appSettingsStore.appSettings.second_dark_color;
    form.accent_color = appSettingsStore.appSettings.accent_color;
    form.accent_dark_color = appSettingsStore.appSettings.accent_dark_color;
    form.scaffold_color = appSettingsStore.appSettings.scaffold_color;
    form.scaffold_dark_color = appSettingsStore.appSettings.scaffold_dark_color;
    form.created_by = appSettingsStore.appSettings.created_by;
    form.created_at = appSettingsStore.appSettings.created_at;
    form.updated_by = appSettingsStore.appSettings.updated_by;
    form.updated_at = appSettingsStore.appSettings.updated_at;
    form.deleted_by = appSettingsStore.appSettings.deleted_by;
    form.deleted_at = appSettingsStore.appSettings.deleted_at;
  }
});

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
