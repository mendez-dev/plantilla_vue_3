import { Alert, AlertType } from "@/plugins/Alert";
import { defineStore } from "pinia";

// Store que para manejar las utilidades de la plantilla
interface State {
  alert: Alert;
  loading: boolean;
}

export const useUtilsStore = defineStore("utils", {
  state: (): State => ({
    loading: false,
    alert: new Alert(false, AlertType.Info, "0", 0),
  }),
  actions: {
    showAlert(alert: Alert) {
      this.alert = alert;
    },
    hideAlert() {
      this.alert = new Alert(false, AlertType.Info, "", 0);
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
