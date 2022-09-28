<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title> Actualizar usuario </v-card-title>
    </v-toolbar>
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      height="10"
      indeterminate
    ></v-progress-linear>

    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              variant="underlined"
              :disabled="loading"
              v-model="form.firstname"
              label="Nombre"
              required
              :error-messages="
                v$.firstname.$error
                  ? v$.firstname.$errors[0].$message.toString()
                  : ''
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              variant="underlined"
              :disabled="loading"
              v-model="form.lastname"
              label="Apellido"
              required
              :error-messages="
                v$.lastname.$error
                  ? v$.lastname.$errors[0].$message.toString()
                  : ''
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              variant="underlined"
              :disabled="loading"
              v-model="form.email"
              label="Correo"
              required
              :error-messages="
                v$.email.$error ? v$.email.$errors[0].$message.toString() : ''
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              variant="underlined"
              :disabled="loading"
              v-model="form.username"
              label="Nombre de usuario"
              required
              :error-messages="
                v$.username.$error
                  ? v$.username.$errors[0].$message.toString()
                  : ''
              "
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              variant="underlined"
              :disabled="loading"
              :items="userGroups"
              v-model="form.id_user_group"
              item-title="name"
              item-value="id_user_group"
              label="Grupo"
              :error-messages="
                v$.id_user_group.$error
                  ? v$.id_user_group.$errors[0].$message.toString()
                  : ''
              "
              required
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="outlined" text @click="$emit('onClose')">
        Cerrar
      </v-btn>
      <v-btn color="primary" variant="flat" text @click="submit">
        Guardar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
// Importaciones de librerías y componentes de terceros
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, email } from "@vuelidate/validators";
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";

// Importaciones de servicios
import groupsService from "@/services/GroupService";
import usersService from "@/services/users.service";

// Importaciones de modelos
import Group from "@/models/Group/Group";
import { Alert, AlertType } from "@/plugins/Alert";

// Definición de propiedades
const props = defineProps({
  id_user: {
    type: String,
    required: true,
  },
});

// Listado de grupos de usuarios
const userGroups = ref(Array<Group>());
const loading = ref(false);

// Formulario para actualizar el usuario
const form = ref({
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  id_user_group: "",
});

// Reglas de validacion para el formulario con vuelidate
const rules = computed(() => {
  return {
    firstname: {
      required: helpers.withMessage("El nombre requerido", required),
    },
    lastname: {
      required: helpers.withMessage("El apellido requerido", required),
    },
    email: {
      required: helpers.withMessage("El correo requerido", required),
      email: helpers.withMessage("El correo no es válido", email),
    },
    username: {
      required: helpers.withMessage("El nombre de usuario requerido", required),
      minLength: helpers.withMessage(
        "El nombre de usuario debe tener al menos 4 caracteres",
        minLength(4)
      ),
    },
    id_user_group: {
      required: helpers.withMessage(
        "El grupo del usuario es requerido",
        required
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    loading.value = true;
    const response = await usersService.update(props.id_user, form.value);
    loading.value = false;

    if (response.status === 200) {
      Alert.show({
        type: AlertType.Success,
        message: "Usuario creado correctamente",
      });
      // Limpimos el formulario
      form.value = {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        id_user_group: "",
      };

      // Reiniciamos las validaciones
      v$.value.$reset();
      // Emitimos el evento de creación de usuario
      emit("onSuccess");
      // Cerramos el dialogo
      emit("onClose");
    }
  }
};

// Definición de eventos
const emit = defineEmits(["onClose", "onSuccess"]);

// Cuando se monta el componente se obtienen los grupos de usuarios
onMounted(async () => {
  // Indicar que se está cargando
  loading.value = true;

  // Cargamos la información del usuario en el formulario
  const userResponse = await usersService.get(props.id_user);

  if (userResponse.status === 200) {
    form.value.firstname = userResponse.data.firstname;
    form.value.lastname = userResponse.data.lastname;
    form.value.email = userResponse.data.email;
    form.value.username = userResponse.data.username;
    form.value.id_user_group = userResponse.data.id_user_group;
  }

  // Obtenemos los grupos de usuarios
  const response = await groupsService.getAll();
  if (response.status === 200) {
    userGroups.value = response.data.map((group: any) => {
      return Group.fromJson(JSON.stringify(group));
    });
  }

  // Indicar que ya no se está cargando
  loading.value = false;
});
</script>
