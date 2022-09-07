import { defineStore } from "pinia";
import AppSettings from "@/models/Settings/AppSettings";
import AppSettingsService from "../../services/appSettings.service";
import { useUtilsStore } from "../utils/index";
import { Alert, AlertType } from "../../plugins/Alert";

const utils = useUtilsStore();

interface State {
  appSettings: AppSettings | null;
  loading: boolean;
  updateLoading: boolean;
}

export const useAppSettingsStore = defineStore("appSettings", {
  state: (): State => ({
    appSettings: null,
    loading: false,
    updateLoading: false,
  }),
  actions: {
    /**
     * Obtenemos la informacion de la configuracion de la aplicacion
     */
    async getAppSettings() {
      this.loading = true;
      utils.setLoading(true);

      const response = await AppSettingsService.getAppSettings();

      if (response.status === 200) {
        this.appSettings = AppSettings.fromJson(JSON.stringify(response.data));
      }

      this.loading = false;
      utils.setLoading(false);
    },
    /**
     * Actualizamos la informacion de la configuracion de la aplicacion
     */
    async updateAppSettings(data: AppSettings) {
      this.updateLoading = true;
      utils.setLoading(true);

      const response = await AppSettingsService.updateAppSettings(data);

      if (response.status === 200) {
        Alert.show({
          type: AlertType.Success,
          message: "Configuración actualizada correctamente",
        });
        this.appSettings = AppSettings.fromJson(JSON.stringify(response.data));
      }

      this.updateLoading = false;
      utils.setLoading(false);
    },
  },
});
