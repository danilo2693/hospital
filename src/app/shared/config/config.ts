import { environment } from 'src/environments/environment';

const { urlPrincipal } = environment;
export const apiLogin = `${urlPrincipal}/login`;
export const apiLoginGoogle = `${urlPrincipal}/login/google`;
export const apiUsuario = `${urlPrincipal}/usuario`;
