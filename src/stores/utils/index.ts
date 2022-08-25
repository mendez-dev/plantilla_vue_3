import { Alert, AlertType } from "@/models/Alert/Alert";
import { defineStore } from "pinia";

// Store que para manejar las utilidades de la plantilla
interface State {
  alert: Alert;
}

export const useUtilsStore = defineStore("utils", {
  state: (): State => ({
    alert: new Alert(false, AlertType.Info, "0", 0),
  }),
  actions: {
    showAlert(alert: Alert) {
      this.alert = alert;
    },
    hideAlert() {
      this.alert = new Alert(false, AlertType.Info, "", 0);
    },
  },
});
