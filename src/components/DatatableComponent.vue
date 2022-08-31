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
                width="30%"
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
      <v-col cols="12" class="d-flex justify-end">
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
import { defineProps, ref, onMounted, watch } from "vue";

const totalPage = ref(0);
const recordsPerPage = ref(1);
const currentPage = ref(1);
const query = ref("");

const data = ref([]);
const debounce = ref(0);

// Function que actualiza los datos de la tabla
const updateData = async () => {
  const response = await props.getData(
    currentPage.value,
    recordsPerPage.value,
    query.value
  );

  if (response.status === 200) {
    console.log(response.data);
    data.value = response.data.data;
    totalPage.value = response.data.total_pages;
    currentPage.value = response.data.current_page;
    console.log(totalPage.value);
  } else {
    data.value = [];
  }
};

const debounceSearch = (event: any) => {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    query.value = event.target.value;
  }, 600);
};

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
    }>,
    required: true,
  },
});

watch(currentPage, updateData);
watch(query, updateData);

onMounted(() => {
  updateData();
});
</script>
<style></style>
