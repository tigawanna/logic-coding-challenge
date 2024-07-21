import { createFileRoute } from "@tanstack/react-router";
import { useViewer } from "../utils/use-viewer";
import { Loader } from "lucide-react";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
  beforeLoad: async ({context}) => {
    if(!context.viewer) {
      throw redirect({to: "/login"});
    }
  }
});

export function HomePage() {
  const { query, mutation } = useViewer();
  const viewer = query.data?.user
  console.log("========================= viewer ================== ", viewer);
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-3">
      <pre>
      {JSON.stringify(viewer, null, 2)}
      </pre>
      <button
        className="btn btn-error"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        log out {mutation.isPending && <Loader />}
      </button>
    </div>
  );
}
