<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      :fullscreen="display.xs.value"
      transition="dialog-center-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          block
          prepend-icon="fa fa-plus"
          class="ma-2"
          color="primary"
          dark
          v-bind="props"
        >
          Nuevo usuario
        </v-btn>
      </template>
      <v-card
        :width="display.width.value > 800 ? 800 : display.width.value * 0.9"
      >
        <v-toolbar color="primary" dark>
          <v-card-title> Agregar usuario </v-card-title>
        </v-toolbar>

        <v-card-text>
          <!-- Formulario para el registro de usuarios segun el modelo User -->
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.firstname"
                  label="Nombre"
                  required
                  variant="underlined"
                  :error-messages="
                    v$.firstname.$error
                      ? v$.firstname.$errors[0].$message.toString()
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.lastname"
                  label="Apellido"
                  variant="underlined"
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
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Correo"
                  required
                  type="email"
                  variant="underlined"
                  :error-messages="
                    v$.email.$error
                      ? v$.email.$errors[0].$message.toString()
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.username"
                  label="Nombre de usuario"
                  variant="underlined"
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
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.id_user_group"
                  :items="groups"
                  item-title="name"
                  item-value="id_user_group"
                  label="Grupo"
                  variant="underlined"
                  :error-messages="
                    v$.id_user_group.$error
                      ? v$.id_user_group.$errors[0].$message.toString()
                      : ''
                  "
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.password"
                  label="Contraseña"
                  required
                  type="password"
                  variant="underlined"
                  :error-messages="
                    v$.password.$error
                      ? v$.password.$errors[0].$message.toString()
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  hidden
                  v-model="form.password_confirmation"
                  label="Repetir contraseña"
                  type="password"
                  variant="underlined"
                  required
                  :error-messages="
                    v$.password_confirmation.$error
                      ? v$.password_confirmation.$errors[0].$message.toString()
                      : ''
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

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
          <v-btn color="primary" variant="flat" text @click="submit">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import groupsService from "@/services/groups.service";
import usersService from "@/services/users.service";
import Group from "@/models/Group/Group";
import { useDisplay } from "vuetify";
import { ref, onMounted, reactive, computed, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { Alert, AlertType } from "@/plugins/Alert";

const display = useDisplay();

const dialog = ref(false);
const groups = ref([]);
const form = reactive({
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  id_user_group: undefined,
  password: "",
  password_confirmation: "",
});

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
    password: {
      required: helpers.withMessage("La contraseña es requerida", required),
    },
    password_confirmation: {
      sameAs: helpers.withMessage(
        "Las contraseñas no coinciden",
        sameAs(form.password)
      ),
    },
  };
});

const emit = defineEmits(["onCreated"]);

const v$ = useVuelidate(rules, form);

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    // Guardamos el nuevo usuario
    const response = await usersService.create(form);
    if (response.status === 200) {
      Alert.show({
        type: AlertType.Success,
        message: "Usuario creado correctamente",
      });
      // Limpiamos el formulario
      form.firstname = "";
      form.lastname = "";
      form.email = "";
      form.username = "";
      form.id_user_group = undefined;
      form.password = "";
      form.password_confirmation = "";

      // Cerramos el dialogo
      dialog.value = false;
      // Reiniciamos las validaciones
      v$.value.$reset();
      // Emitimos el evento de creación de usuario
      emit("onCreated");
    }
  }
};

onMounted(async () => {
  const response = await groupsService.getAll();

  if (response.status === 200) {
    groups.value = response.data.map((group: any) => {
      return Group.fromJson(JSON.stringify(group));
    });
  }
});
</script>
