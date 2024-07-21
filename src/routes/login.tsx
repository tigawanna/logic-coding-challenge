import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader, Mail, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

export function LoginPage({}) {
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
    onSuccess: (data) => {
      console.log("========================= login success  ================== ", data);
    },
    onError: (error) => {
      console.log("========================= login error  ================== ", error);
    },
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutate(input);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
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
    </div>
  );
}
