<template>
  <div class="text-center">
    <v-dialog
      :width="display.width.value > 450 ? 450 : display.width.value * 0.9"
      v-model="dialog"
      transition="dialog-center-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- Crear un slot para activar el cuadro de dialogo -->
        <slot :props="props"></slot>
      </template>
      <v-card>
        <v-toolbar :color="color" dark class="mb-7">
          <v-row class="justify-center">
            <p class="text-center text-white text-h6 my-7">{{ title }}</p>
          </v-row>
        </v-toolbar>
        <v-row>
          <v-col class="d-flex justify-center">
            <v-avatar variant="flat" :color="color" size="100">
              <v-icon color="white" size="35" class="d-flex justify-center">
                {{ icon }}
              </v-icon>
            </v-avatar>
          </v-col>
        </v-row>
        <p v-if="subtitle != ''" class="text-subtitle-1 text-center my-7">
          {{ subtitle }}
        </p>

        <v-divider class="mb-5"></v-divider>

        <v-card-actions class="justify-space-evenly">
          <!-- <v-row>
            <v-col cols="6"> -->
          <v-btn
            width="45%"
            color="primary"
            variant="outlined"
            text
            @click="
              dialog = false;
              $emit('onCancel');
            "
          >
            Cancelar
          </v-btn>
          <!-- </v-col>
            <v-col cols="6"> -->
          <v-btn
            class="text-white"
            width="45%"
            :color="color"
            variant="flat"
            text
            @click="
              $emit('onConfirm');
              dialog = false;
            "
          >
            Aceptar
          </v-btn>
          <!-- </v-col>
          </v-row> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify";
import { ref, defineProps, defineEmits } from "vue";

const display = useDisplay();
const dialog = ref(false);

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "fa fa-info",
  },
  color: {
    type: String,
    default: "primary",
  },
});

defineEmits(["onConfirm", "onCancel"]);
</script>
