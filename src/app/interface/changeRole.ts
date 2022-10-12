import { Permission } from "./permissions";
export interface changeRole{
    permissionAll: boolean;
    role: string;
    permissions: Permission[];
}