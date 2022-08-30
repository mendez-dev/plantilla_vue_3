<template>
  <v-text-field
    v-maska="{
      mask: '!#HHHHHH',
      tokens: { H: { pattern: /[0-9a-fA-F]/, uppercase: true } },
    }"
    @input="updateValue"
    v-bind:model-value="modelValue"
    variant="underlined"
    class="ma-0 pa-0"
    solo
  >
    <template v-slot:append>
      <v-menu
        v-model="menu"
        top
        nudge-bottom="105"
        nudge-left="16"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <div :style="swatchStyle" v-bind="props" />
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-color-picker v-model="color" hide-inputs mode="hex" flat />
          </v-card-text>
        </v-card>
      </v-menu>
    </template>
  </v-text-field>
</template>
<script setup lang="ts">
import { ref, defineProps, computed, defineEmits, onMounted, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const color = ref("");

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};

const menu = ref(false);

onMounted(() => {
  if (props.modelValue == "") {
    color.value = "";
  } else {
    color.value = props.modelValue;
  }
});

watch(color, (value) => {
  emit("update:modelValue", value);
});

const swatchStyle = computed(() => {
  return {
    backgroundColor: props.modelValue,
    width: "30px",
    height: "30px",
    borderRadius: menu.value ? "50%" : "4px",
    transition: "border-radius 200ms ease-in-out",
  };
});
</script>
<style></style>
