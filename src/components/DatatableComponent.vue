<template>
  <div>
    <v-row class="justify-end">
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          @input="debounceSearch"
          label="Buscar"
          variant="underlined"
          prepend-icon="fas fa-search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead v-if="headers">
            <tr>
              <th
                v-for="(header, index) in headers"
                v-bind:key="index"
                :class="`text-${header.aling ?? 'left'}`"
                :width="header.width"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" v-bind:key="index">
              <td v-for="(header, index) in headers" v-bind:key="index">
                <slot :name="`item.${header.value}`" :item="item">{{
                  item[header.value]
                }}</slot>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row class="justify-end">
      <v-col cols="12" sm="6" md="3">
        <v-select
          variant="underlined"
          v-model="recordsPerPage"
          :items="[5, 10, 20, 50, 100]"
          label="Registros por página"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="9" class="d-flex justify-end mt-2">
        <v-pagination
          :total-visible="5"
          active-color="primary"
          :length="totalPage"
          v-model="currentPage"
        >
        </v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted, watch, defineExpose } from "vue";

// Props
const props = defineProps({
  getData: {
    type: Function,
    default: () => {
      return [];
    },
  },
  headers: {
    type: Array as () => Array<{
      text: string;
      value: string;
      aling?: string;
      width?: string;
    }>,
    required: true,
  },
});

// Data
const totalPage = ref(0);
const recordsPerPage = ref(10);
const currentPage = ref(1);
const query = ref("");
const data = ref([]);
const debounce = ref(0);

/**
 * Obtiene los datos desde la funcion props.getData
 * que se envía como párametro
 */
const getData = async () => {
  // Ejecutamos la función que nos devuelve los datos
  const response = await props.getData(
    currentPage.value,
    recordsPerPage.value,
    query.value
  );

  // Verificamos el estado de la respuesta
  if (response.status === 200) {
    data.value = response.data.data;
    totalPage.value = response.data.total_pages;
    currentPage.value = response.data.current_page;
  } else {
    data.value = [];
  }
};

/**
 * Actualiza el valor query para realzar la busqueda
 * con el valor del input de busqueda con un retraso de 600ms
 * desde que se deja de escribir
 */
const debounceSearch = (event: any) => {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    query.value = event.target.value;
  }, 600);
};

// Watchers
watch(currentPage, getData);
watch(query, getData);
watch(recordsPerPage, () => {
  currentPage.value = 1;
  getData();
});

// OnMounted
onMounted(() => {
  getData();
});

// Expose
defineExpose({
  getData,
});
</script>
<style></style>
