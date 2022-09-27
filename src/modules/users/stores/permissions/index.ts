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
    async getInitialData(id: string) {
      this.permissions = [];

      this.loading = true;
      utils.setLoading(true);

      // Obtenemos el grupo
      const groupResponse = await GroupService.get(id);
      if (groupResponse.status === 200) {
        this.group = Group.fromJson(JSON.stringify(groupResponse.data));
      }

      // Obtenemos los permisos
      const permissionsResponse = await PermissionService.getAll();

      if (permissionsResponse.status === 200) {
        let permissionsArray = permissionsResponse.data.map((permission: any) =>
          Permission.fromJson(JSON.stringify(permission))
        );

        // Indicamos como seleccionados los permisos que ya tiene el grupo
        if (this.group && this.group.permissions) {
          permissionsArray = permissionsArray.map((permission: Permission) => {
            // Verificar si el permiso esta en el grupo mediante el id_permission
            const permissionInGroup = this.group!.permissions!.find(
              (groupPermission) =>
                groupPermission.id_permission === permission.id_permission
            );

            if (permissionInGroup) {
              permission.selected = true;
            } else {
              permission.selected = false;
            }

            return permission;
          });
        }

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
    togglePermission(id_permission: string) {
      // Verificamos si el permiso tiene hijos
      const permission = this.permissions.find(
        (permission) => permission.id_permission === id_permission
      );

      if (permission && permission.children) {
        // Si tiene hijos, seleccionamos o deseleccionamos todos los hijos
        if (permission.selected) {
          permission.children.forEach((childPermission) => {
            childPermission.selected = true;
          });
        } else {
          permission.children.forEach((childPermission) => {
            childPermission.selected = false;
          });
        }
      }
    },
    async updatePermissions() {
      this.updateLoading = true;
      utils.setLoading(true);

      // Obtenemos los permisos seleccionados tanto del grupo como de sus hijos
      const selectedPermissions = this.permissions
        .filter((permission) => permission.selected)
        .map((permission) => permission.id_permission);

      this.permissions.forEach((permission) => {
        if (permission.children) {
          permission.children.forEach((childPermission) => {
            if (childPermission.selected) {
              selectedPermissions.push(childPermission.id_permission);
            }
          });
        }
      });

      console.log(selectedPermissions);

      // Actualizamos los permisos del grupo
      const response = await GroupService.assignPermissions(
        this.group!.id_user_group,
        selectedPermissions
      );

      if (response.status === 200) {
        Alert.show({
          type: AlertType.Success,
          message: "Permisos actualizados correctamente",
        });
      }

      this.updateLoading = false;
      utils.setLoading(false);
    },
  },
});
