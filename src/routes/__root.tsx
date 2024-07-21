import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { TailwindIndicator } from "../components/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, useRouterState } from "@tanstack/react-router";
import Nprogress from "../components/nprogress/Nprogress";
import { QueryClient } from "@tanstack/react-query";
import { ViewerData } from "../components/types";

interface RouterContext {
  queryClient: QueryClient;
  viewer: ViewerData;
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
// export const Route = createRootRoute<RouterContext>({
//   component: RootComponent,
// });

export function RootComponent({}) {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <div className="w-full h-full flex min-h-screen flex-col items-center ">
      <div className="w-full flex flex-col justify-between bg-base-300 sticky top-0">
        <div className="w-full flex justify-between p-1 bg-base-300">
          <Link to="/" className="btn btn-ghost normal-case text-xl btn-primary">
            Home
          </Link>
          <Link to="/login" className="btn btn-ghost normal-case text-xl btn-primary">
            login
          </Link>
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
