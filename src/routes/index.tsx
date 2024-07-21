import { createFileRoute, redirect } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { useViewer } from "../utils/use-viewer";

export const Route = createFileRoute("/")({
  component: IndexComponent,
  beforeLoad: async ({ context }) => {
    console.log("========================= beforeLoad viewr ================== ", context.viewer);
    if (!context.viewer?.user) {
      throw redirect({ to: "/login" });
    }
  },
});

function IndexComponent() {
  const { query, mutation } = useViewer();
  const viewer = query.data?.user;
  console.log("========================= index page viewer ================== ", viewer);
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-3">
      <pre>{JSON.stringify(viewer, null, 2)}</pre>
      <button
        className="btn btn-error"
        disabled={mutation.isPending}
        onClick={() => mutation.mutate()}>
        log out {mutation.isPending && <Loader className="animate-spin size-4"/>}
      </button>
    </div>
  );
}
