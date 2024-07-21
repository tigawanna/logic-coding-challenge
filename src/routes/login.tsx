import { useMutation,useQueryClient } from "@tanstack/react-query";
import { createFileRoute,useNavigate } from "@tanstack/react-router";
import { Loader, Mail, User } from "lucide-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ViewerData } from "../components/types";



export interface ErrorResponse {
  message: string;
}
export interface SuccessResponse {
  message: string;
  data: Data;
}

export interface Data {
  access_token: string;
  token_type: string;
  expires_in: any;
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export function LoginPage({}) {
  const navigate =useNavigate({
    from: "/login",
  })
  const qc = useQueryClient()
  const [input, setInput] = useState({
    username: "OMCOL",
    password: "HEMO+9807",
  });

  const mutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => {
      return fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      });
    },
    onSuccess: (data: SuccessResponse) => {
      console.log("========================= login success  ================== ", data);
      localStorage.removeItem("token");
      localStorage.setItem("token",JSON.stringify(data.data));
      qc.setQueryData(["viewer"], {user:jwtDecode(data.data.access_token) }as ViewerData);
      navigate({
        to: "/",
      });
    },
    onError: (error: ErrorResponse) => {
      console.log("========================= login error  ================== ", error);
      qc.invalidateQueries({
        queryKey: ["viewer"],
      });
    },
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const success_message = mutation.data?.message;
  const error_message = mutation.error?.message;
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-2 justify-center">
      <h2 className="text-2xl text-warning">login</h2>
      <form
        onSubmit={handleSubmit}
        className="p-[3%] w-[90%] md:w-[60%] lg:w-[40%] bg-base-200 flex flex-col gap-5">
        {/* username  */}
        <label className="input input-bordered flex items-center gap-2">
          <User className="h-4 w-4 opacity-70" />
          <input
            name="username"
            type="text"
            required
            className="grow"
            placeholder="Username"
            value={input.username}
            onChange={handleChange}
          />
        </label>

        {/* password */}
        <label className="input input-bordered flex items-center gap-2">
          <Mail className="h-4 w-4 opacity-70" />
          <input
            name="password"
            type="password"
            required
            className="grow"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
        </label>
        <button className="btn btn-primary" disabled={mutation.isPending}>
          Submit {mutation.isPending && <Loader className="h-4 w-4 animate-spin" />}
        </button>
      </form>
      {success_message && success_message.length > 1 && (
        <p className=" p-5 border-success rounded-lg bg-success-content text-success">
          {success_message}
        </p>
      )}
      {error_message && error_message.length > 1 && (
        <p className="p-5 border-error rounded-lg bg-error-content text-error">{error_message}</p>
      )}
    </div>
  );
}
