import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, useRouterState } from "@tanstack/react-router";
import Nprogress from "../components/nprogress/Nprogress";

export const Route = createRootRoute({
  component: RootRoute,
});

interface RootRouteProps {}

export function RootRoute({}: RootRouteProps) {
    const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <div className="w-full h-full flex min-h-screen flex-col items-center ">
      <div className="w-full flex flex-col justify-between bg-base-300">
         <div className="w-full flex justify-between p-1 bg-base-300">
        <Link to="/" className="btn btn-ghost normal-case text-xl btn-primary">Home</Link>
        <Link to="/login" className="btn btn-ghost normal-case text-xl btn-primary">login</Link>

         </div>
        <Nprogress isAnimating={isLoading} />
      </div>
      <Outlet />

      <TailwindIndicator />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}
