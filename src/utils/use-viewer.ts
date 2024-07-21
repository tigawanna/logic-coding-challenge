import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { ViewerData } from "../components/types";

export function useViewer() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 3000);
      })  
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
