<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-card-title> Actualizar contraseña </v-card-title>
    </v-toolbar>
    <v-progress-linear
      v-if="loading"
      class="position-absolute"
      style="z-index: 1"
      height="10"
      indeterminate
    ></v-progress-linear>

    <v-card-text>
      <p class="mb-5">
        <strong>Ingrese una nueva contraseña para:</strong> {{ user?.fullName }}
      </p>
      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              type="password"
              variant="underlined"
              :disabled="loading"
              v-model="form.password"
              label="Contraseña"
              required
              :error-messages="
                v$.password.$error
                  ? v$.password.$errors[0].$message.toString()
                  : ''
              "
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              type="password"
              variant="underlined"
              :disabled="loading"
              v-model="form.password_confirmation"
              label="Confirmar contraseña"
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
// Logica para la validacion del formulario de cambio de contraseña

// Impotaciones de librerías y componentes de terceros
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, helpers } from "@vuelidate/validators";
import { computed, defineEmits, defineProps, onMounted, Ref, ref } from "vue";

// Importaciones de servicios
import usersService from "@/services/users.service";

// Importaciones de modelos
import User from "@/models/User/User";

// Importaciones de componentes y librerías propias
import { Alert, AlertType } from "@/plugins/Alert";

// Definición de propiedades
const props = defineProps({
  id_user: {
    type: String,
    required: true,
  },
});

const loading: Ref<boolean> = ref(false);
const user: Ref<User | null> = ref(null);

// Formulario para actualizar la contraseña
const form = ref({
  password: "",
  password_confirmation: "",
});

// Definición de eventos
const emit = defineEmits(["onClose", "onSuccess"]);

// Reglas de validacion para el formulario con vuelidate
const rules = computed(() => {
  return {
    password: {
      required: helpers.withMessage("La contraseña es requerida", required),
      minLength: helpers.withMessage(
        "La contraseña debe tener al menos 8 caracteres",
        minLength(8)
      ),
    },
    password_confirmation: {
      required: helpers.withMessage(
        "La confirmación de la contraseña es requerida",
        required
      ),
      sameAsPassword: helpers.withMessage(
        "Las contraseñas no coinciden",
        sameAs(form.value.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form);

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    loading.value = true;
    const response = await usersService.changePassword(
      props.id_user,
      form.value.password
    );

    if (response.status === 200) {
      Alert.show({
        type: AlertType.Success,
        message: "La contraseña se ha actualizado correctamente",
      });

      form.value.password = "";
      form.value.password_confirmation = "";

      v$.value.$reset();

      emit("onSuccess");
      emit("onClose");
    }
  }
};

onMounted(async () => {
  loading.value = true;
  const response = await usersService.get(props.id_user);
  if (response.status === 200) {
    user.value = User.fromJson(JSON.stringify(response.data));
  }
  loading.value = false;
});
</script>
