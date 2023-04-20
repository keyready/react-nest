import { UserRoles } from '../consts/consts';

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    image: string;
    roles?: UserRoles[];
}

export interface UserSchema {
    authData?: User;

    _inited?: boolean;
}
