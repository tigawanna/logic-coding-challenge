export interface ViewerData{
    user:TokenDetals|undefined
}
export interface TokenDetals {
  cd_identityUsuario: string;
  nb_nombreUsuario: string;
  Idioma: string;
  cd_identityPaisUsuario: string;
  nb_paisUsuario: string;
  tx_acronimoPais: string;
  cd_identitySucursalUsuario: string;
  nb_sucursalUsuario_sucursal: string;
  CulturaUsuario: string;
  ZonaHorarioaUsuario: string;
  st_estatus: string;
  url_soporte: string;
  cliente: string;
  exp: number;
  iss: string;
  aud: string;
}
