import { defineStore } from "pinia";
import AppSettings from "@/models/Settings/AppSettings";
import AppSettingsService from "../../services/appSettings.service";

interface State {
  appSettings: AppSettings | null;
  loading: boolean;
}

export const useAppSettingsStore = defineStore("appSettings", {
  state: (): State => ({
    appSettings: null,
    loading: false,
  }),
  actions: {
    async getAppSettings() {
      this.loading = true;

      const response = await AppSettingsService.getAppSettings();

      if (response.status === 200) {
        this.appSettings = AppSettings.fromJson(JSON.stringify(response.data));
        console.log(this.appSettings);
      }

      this.loading = false;
    },
  },
});
