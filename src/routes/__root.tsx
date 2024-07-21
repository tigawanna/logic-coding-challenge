import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootRoute,
});

interface RootRouteProps {

}

export function RootRoute({}:RootRouteProps){
return (
  <div className="w-full h-full flex min-h-screen flex-col items-center justify-center">
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);
}
