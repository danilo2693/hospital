import { environment } from 'src/environments/environment';

const { urlPrincipal } = environment;
export const apiLogin = `${urlPrincipal}/login`;
export const apiLoginGoogle = `${urlPrincipal}/login/google`;
export const apiUsuario = `${urlPrincipal}/usuario`;
export const apiImagen = `${urlPrincipal}/imagen`;
export const apiUpload = `${urlPrincipal}/upload`;
export const apiBusquedaTodo = `${urlPrincipal}/todo`;
export const apiBusquedaColeccion = `${urlPrincipal}/busqueda/coleccion`;
export const apiHospital = `${urlPrincipal}/hospital`;
export const apiMedico = `${urlPrincipal}/medico`;
