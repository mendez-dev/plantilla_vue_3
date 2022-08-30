<template>
  <v-card :subtitle="headerText">
    <v-card-text>
      <v-row>
        <v-col cols="10">
          <p class="text-h5 mb-3">{{ mainText }}</p>
          <v-btn color="primary" variant="flat" @click="$emit('onClick')">
            {{ buttonText }}
          </v-btn>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <v-icon class="mr-3" size="45" color="primary"> {{ icon }} </v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  headerText: {
    type: String,
    default: "",
  },
  mainText: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "fa fa-info",
  },
});
</script>
