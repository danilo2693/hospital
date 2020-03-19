// tslint:disable: variable-name
export class Usuario {
  constructor(
    public nombre: number,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {}
}
