import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ViewerData } from "../utils/use-viewer";



export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  viewer?: ViewerData;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="h-full min-h-screen flex flex-col bg-bg-default text-fg-default">
        <Outlet />
      </div>
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
