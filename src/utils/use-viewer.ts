import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";


export interface ViewerData {
  user: TokenDetals | undefined;
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


export function useViewer() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem("token");
          qc.invalidateQueries({ queryKey: ["viewer"] });
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    },
    onSettled: () => {
      if (typeof window !== "undefined") {
        location.reload();
      }
    },
  });
  const query = useSuspenseQuery({
    queryKey: ["viewer"],
    queryFn: async () => {
      return new Promise<ViewerData|undefined>((resolve, reject) => {
        try {
          const token = localStorage.getItem("token");
          console.log("========================= token ================== ", token);
          if (!token) {
            // throw new Error("Token not found in local storage");
            resolve({user:undefined});
            return
          }
          const decodedData = {user:jwtDecode(token)} as ViewerData;
          resolve(decodedData);
        } catch (error) {
          reject(undefined);
        return
        }
      });
    },
  });

  return { query, mutation };
}
