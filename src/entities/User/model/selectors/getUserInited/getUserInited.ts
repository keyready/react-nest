import { StateSchema } from 'app/providers/StoreProvider';

export const getUserInited = (state: StateSchema) => state.user._inited;
export const getUserAuthorized = (state: StateSchema) => state.user._authorized;
