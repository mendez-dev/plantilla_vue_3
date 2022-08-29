<template>
  <v-container>
    <v-row>
      <v-col cols="12"><v-breadcrumbs :items="items"></v-breadcrumbs> </v-col>
    </v-row>
    <v-row v-if="!appSettings.loading">
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
                <v-col cols="12">
                  <v-list-subheader> Aspectos generales </v-list-subheader>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
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
                    variant="underlined"
                    label="Divisa"
                    v-model="form.default_currency"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    variant="underlined"
                    label="IVA"
                    v-model="form.default_tax"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="8">
                      <v-list-subheader>Paleta de colores</v-list-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-switch
                        color="primary"
                        v-model="darkMode"
                        label="Modo oscuro"
                      ></v-switch>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                </v-col>
              </v-row>

              <div v-if="darkMode">
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Primario"
                      v-model="form.dark_primary_color"
                      :error-messages="
                        v$.dark_primary_color.$error
                          ? v$.dark_primary_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Primario (Variante)"
                      v-model="form.dark_primary_color_variant"
                      :error-messages="
                        v$.dark_primary_color_variant.$error
                          ? v$.dark_primary_color_variant.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Secundario"
                      v-model="form.dark_secondary_color"
                      :error-messages="
                        v$.dark_secondary_color.$error
                          ? v$.dark_secondary_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Secundario (Variante)"
                      v-model="form.dark_secondary_color_variant"
                      :error-messages="
                        v$.dark_secondary_color_variant.$error
                          ? v$.dark_secondary_color_variant.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Fondo"
                      v-model="form.dark_background_color"
                      :error-messages="
                        v$.dark_background_color.$error
                          ? v$.dark_background_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Superficie"
                      v-model="form.dark_surface_color"
                      :error-messages="
                        v$.dark_surface_color.$error
                          ? v$.dark_surface_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Error"
                      v-model="form.dark_error_color"
                      :error-messages="
                        v$.dark_error_color.$error
                          ? v$.dark_error_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
              </div>

              <div v-else>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Primario"
                      v-model="form.primary_color"
                      :error-messages="
                        v$.primary_color.$error
                          ? v$.primary_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Primario (Variante)"
                      v-model="form.primary_color_variant"
                      :error-messages="
                        v$.primary_color_variant.$error
                          ? v$.primary_color_variant.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Secundario"
                      v-model="form.secondary_color"
                      :error-messages="
                        v$.secondary_color.$error
                          ? v$.secondary_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Secundario (Variante)"
                      v-model="form.secondary_color_variant"
                      :error-messages="
                        v$.secondary_color_variant.$error
                          ? v$.secondary_color_variant.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Fondo"
                      v-model="form.background_color"
                      :error-messages="
                        v$.background_color.$error
                          ? v$.background_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Superficie"
                      v-model="form.surface_color"
                      :error-messages="
                        v$.surface_color.$error
                          ? v$.surface_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ColorPickerInput
                      label="Error"
                      v-model="form.error_color"
                      :error-messages="
                        v$.error_color.$error
                          ? v$.error_color.$errors[0].$message.toString()
                          : ''
                      "
                    />
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :loading="appSettings.updateLoading"
              color="primary"
              @click="submit"
              block
              variant="flat"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ColorPickerInput from "@/components/ColorPickerInput.vue";
import { ref, onMounted, computed } from "vue";
import { useAppSettingsStore } from "@/stores/app_settings";
import AppSettings from "@/models/Settings/AppSettings";
import { helpers, required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const appSettings = useAppSettingsStore();
const form = ref({ ...appSettings.appSettings });
const darkMode = ref(false);

// Obtenemos la información de los ajustes al cargar la vista
onMounted(async () => {
  await appSettings.getAppSettings();
  if (appSettings.appSettings) {
    form.value = { ...appSettings.appSettings };
  }
});

const rules = computed(() => {
  return {
    primary_color: {
      required: helpers.withMessage("El color primario es requerido", required),
      minLength: helpers.withMessage(
        "El color primario debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_primary_color: {
      required: helpers.withMessage(
        "El color primario (oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color primario (oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    primary_color_variant: {
      required: helpers.withMessage(
        "El color primario (variante) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color primario (variante) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_primary_color_variant: {
      required: helpers.withMessage(
        "El color primario (variante oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color primario (variante oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    secondary_color: {
      required: helpers.withMessage(
        "El color secundario es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color secundario debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_secondary_color: {
      required: helpers.withMessage(
        "El color secundario (oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color secundario (oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    secondary_color_variant: {
      required: helpers.withMessage(
        "El color secundario (variante) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color secundario (variante) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_secondary_color_variant: {
      required: helpers.withMessage(
        "El color secundario (variante oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color secundario (variante oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    background_color: {
      required: helpers.withMessage("El color de fondo es requerido", required),
      minLength: helpers.withMessage(
        "El color de fondo debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_background_color: {
      required: helpers.withMessage(
        "El color de fondo (oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color de fondo (oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    surface_color: {
      required: helpers.withMessage(
        "El color de superficie es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color de superfcie debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_surface_color: {
      required: helpers.withMessage(
        "El color de superficie (oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color de superficie (oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    error_color: {
      required: helpers.withMessage("El color de error es requerido", required),
      minLength: helpers.withMessage(
        "El color de error debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
    dark_error_color: {
      required: helpers.withMessage(
        "El color de error (oscuro) es requerido",
        required
      ),
      minLength: helpers.withMessage(
        "El color de error (oscuro) debe tener al menos 7 caracteres",
        minLength(7)
      ),
    },
  };
});
const v$ = useVuelidate(rules, form as any);

// Validamos si los campos de la paleta de colores oscuros son validos
const validDarkMode = computed(() => {
  return (
    !v$.value.dark_primary_color.$error &&
    !v$.value.dark_primary_color_variant.$error &&
    !v$.value.dark_secondary_color.$error &&
    !v$.value.dark_secondary_color_variant.$error &&
    !v$.value.dark_background_color.$error &&
    !v$.value.dark_surface_color.$error &&
    !v$.value.dark_error_color.$error
  );
});

const validLightMode = computed(() => {
  return (
    !v$.value.primary_color.$error &&
    !v$.value.primary_color_variant.$error &&
    !v$.value.secondary_color.$error &&
    !v$.value.secondary_color_variant.$error &&
    !v$.value.background_color.$error &&
    !v$.value.surface_color.$error &&
    !v$.value.error_color.$error
  );
});

const submit = async () => {
  v$.value.$validate();

  if (v$.value.$error) {
    // Cambiamos la pestaña del tema para mostrar los errores
    if (!validLightMode.value) {
      darkMode.value = false;
    }
    if (validLightMode.value && !validDarkMode.value) {
      darkMode.value = true;
    }
  } else {
    appSettings.updateAppSettings(form.value as AppSettings);
  }
};

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
