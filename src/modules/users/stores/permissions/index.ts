import { defineStore } from "pinia";
import Group from "@/models/Group/Group";
import Permission from "@/models/Group/Permission";
import GroupService from "@/services/GroupService";
import PermissionService from "@/services/PermissionService";
import { useUtilsStore } from "@/stores/utils/index";
import { Alert, AlertType } from "@/plugins/Alert";

const utils = useUtilsStore();

interface State {
  group: Group | null;
  loading: boolean;
  updateLoading: boolean;
  permissions: Permission[];
}

export const usePermissionsStore = defineStore("permissions", {
  state: (): State => ({
    group: null,
    loading: false,
    updateLoading: false,
    permissions: [],
  }),
  actions: {
    /**
     * Obtenemos la informacion del grupo
     * @param id
     */
    async getGroup(id: string) {
      this.loading = true;
      utils.setLoading(true);

      const response = await GroupService.get(id);

      if (response.status === 200) {
        this.group = Group.fromJson(JSON.stringify(response.data));
      }

      this.loading = false;
      utils.setLoading(false);
    },
    /**
     * Obtenemos el listado de todos los permisos disponibles
     */
    async getPermissions() {
      this.loading = true;
      utils.setLoading(true);

      const response = await PermissionService.getAll();

      if (response.status === 200) {
        const permissionsArray = response.data.map((permission: any) =>
          Permission.fromJson(JSON.stringify(permission))
        );

        // Identificamos los permisos padre son aquellos que no dependen de otro permiso
        const parentPermissions = permissionsArray.filter(
          (permission: Permission) => permission.depends_on === null
        );

        // Agregamos los permisos hijos a sus respectivos permisos padre
        parentPermissions.forEach((parentPermission: Permission) => {
          parentPermission.children = permissionsArray.filter(
            (permission: Permission) =>
              permission.depends_on === parentPermission.id_permission
          );
        });

        this.permissions = parentPermissions;
      }

      this.loading = false;
      utils.setLoading(false);
    },
  },
});
