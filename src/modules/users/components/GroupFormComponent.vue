<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :fullscreen="display.xs.value"
      transition="dialog-center-transition"
    >
      <!-- Activador -->
      <template v-slot:activator="{ props }">
        <v-btn
          block
          prepend-icon="fa fa-plus"
          class="ma-2"
          color="primary"
          dark
          v-bind="props"
        >
          Nuevo grupo
        </v-btn>
      </template>
      <v-card
        :width="display.width.value > 800 ? 800 : display.width.value * 0.9"
      >
        <v-progress-linear
          v-if="isLoading"
          class="position-absolute"
          style="z-index: 1"
          height="10"
          indeterminate
        ></v-progress-linear>
        <v-toolbar color="primary" dark>
          <v-card-title> Agregar grupo </v-card-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="form.name"
                  label="Nombre"
                  required
                  variant="underlined"
                  :error-messages="
                    v$.name.$error ? v$.name.$errors[0].$message.toString() : ''
                  "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="form.description"
                  label="Descripción"
                  variant="underlined"
                  required
                  :error-messages="
                    v$.description.$error
                      ? v$.description.$errors[0].$message.toString()
                      : ''
                  "
                ></v-textarea>
              </v-col>
            </v-row>
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
              <v-btn
                :loading="isLoading"
                color="primary"
                variant="flat"
                text
                @click="submit"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, defineEmits } from "vue";
import { useDisplay } from "vuetify";
import { helpers, minLength, maxLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import group from "@/services/GroupService";
import { Alert, AlertType } from "@/plugins/Alert";

const dialog = ref(false);
const display = useDisplay();
const isLoading = ref(false);

// Definición del formulario
const form = ref({
  name: "",
  description: "",
});

// Definición de las validaciones
const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("El nombre es requerido", required),
      minLength: helpers.withMessage(
        "El nombre debe tener al menos 3 caracteres",
        minLength(3)
      ),
      maxLength: helpers.withMessage(
        "El nombre debe tener como máximo 50 caracteres",
        maxLength(50)
      ),
    },
    description: {
      required: helpers.withMessage("La descripción es requerida", required),
      minLength: helpers.withMessage(
        "La descripción debe tener al menos 3 caracteres",
        minLength(3)
      ),
      maxLength: helpers.withMessage(
        "La descripción debe tener como máximo 50 caracteres",
        maxLength(250)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);
const emit = defineEmits(["onCreated"]);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    isLoading.value = true;
    const response = await group.create(form.value);
    isLoading.value = false;
    if (response.status === 200) {
      // Mostramos un mensaje de éxito
      Alert.show({
        type: AlertType.Success,
        message: "Grupo creado correctamente",
      });
      // Limpiamos el formulario
      form.value.name = "";
      form.value.description = "";

      v$.value.$reset();

      dialog.value = false;

      emit("onCreated");
    }
  }
};
</script>
