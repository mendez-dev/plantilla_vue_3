<template>
  <v-snackbar
    v-model="utils.alert.show"
    :color="utils.alert.color"
    elevation="24"
    location="top right"
    :timeout="utils.alert.timeout"
  >
    <v-row>
      <v-col class="d-flex" cols="12">
        <div class="align-self-center justify-center">
          <v-icon v-if="utils.alert.type == AlertType.Error" class="mr-5">
            fa fa-circle-exclamation
          </v-icon>
          <v-icon v-if="utils.alert.type == AlertType.Info" class="mr-5">
            fa fa-circle-info
          </v-icon>
          <v-icon v-if="utils.alert.type == AlertType.Warning" class="mr-5">
            fa fa-triangle-exclamation
          </v-icon>
          <v-icon v-if="utils.alert.type == AlertType.Success" class="mr-5">
            fa fa-circle-check
          </v-icon>
        </div>
        <div class="ml-0">{{ utils.alert.message }}</div>
      </v-col>
    </v-row>

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="utils.alert.show = false">
        <v-icon small>fa fa-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { AlertType } from "@/models/Alert/Alert";
import { useUtilsStore } from "@/stores/utils";
const utils = useUtilsStore();
</script>

<style></style>
