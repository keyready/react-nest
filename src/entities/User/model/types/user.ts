import { UserRoles } from '../consts/consts';

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    image: string;
    roles?: UserRoles[];
    access_token: string;
    refresh_token: string;
}

export interface UserSchema {
    authData?: User;
    isLoading?: boolean;
    error?: string;
    _inited?: boolean;
    _authorized?: boolean;
}
