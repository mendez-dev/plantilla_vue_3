<template>
  <v-app>
    <v-main>
      <v-spacer class="my-15"></v-spacer>
      <v-container fluid fill-height>
        <v-row class="justify-center">
          <v-col xl="3" lg="4" md="6" sm="8" xs="12">
            <v-card class="mt-10 pa-2 pa-10">
              <p class="text-h5 text-center pt-5 my-5 primary--text">
                Iniciar sesión
              </p>

              <v-form>
                <v-text-field
                  :error-messages="
                    v$.username.$error
                      ? v$.username.$errors[0].$message.toString()
                      : ''
                  "
                  v-model="form.username"
                  prepend-icon="fas fa-user"
                  label="Nombre de usuario"
                  variant="underlined"
                ></v-text-field>
                <v-text-field
                  :error-messages="
                    v$.password.$error
                      ? v$.password.$errors[0].$message.toString()
                      : ''
                  "
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-icon="fas fa-key"
                  :append-icon="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  @click:append="showPassword = !showPassword"
                  label="Contraseña"
                  variant="underlined"
                ></v-text-field>
                <v-btn
                  :loading="auth.loading"
                  color="primary"
                  @click="submit"
                  class="my-10"
                  block
                >
                  Iniciar sesión
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-spacer class="my-10"></v-spacer>
    <v-footer class="bg-primary text-white text-center d-flex flex-column">
      <v-divider></v-divider>

      <div class="text-white">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, minLength } from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();

const showPassword: Ref<boolean> = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const rules = computed(() => {
  return {
    username: {
      minLength: helpers.withMessage(
        "El usuario debe tener al menos 4 caracteres",
        minLength(4)
      ),
      required: helpers.withMessage(
        "El nombre de usuario es requerido",
        required
      ),
    },
    password: {
      required: helpers.withMessage("La contraseña es requerida", required),
    },
  };
});

const v$ = useVuelidate(rules, form);

const submit = async () => {
  v$.value.$validate();

  if (!v$.value.$error) {
    auth.attemptLogin(form.username, form.password);
  }
};
</script>

<style></style>
