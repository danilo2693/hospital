import { Usuario } from '../../../login/shared/models/usuario.model';
import { Hospital } from '../../../hospitales/shared/models/hospital.model';

export class Medico {
  constructor(
    public nombre?: string,
    public img?: string,
    public usuario?: string,
    public hospital?: Hospital,
    public _id?: string
  ) {}
}
