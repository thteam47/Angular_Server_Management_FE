import { Permission } from "./permissions";

export interface User {
    type: string;
    password: string;
    fullName: string;
    idUser: string;
    action: string[];
    userId: string;
    full_name: string;
    email: string;
    username: string;
    permission_all: boolean;
    role: string;
    permissions: Permission[];
    status: string;
}