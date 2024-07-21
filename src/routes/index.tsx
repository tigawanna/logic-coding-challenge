import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/")({
  component: HomePage,
});



export function HomePage(){
return (
  <div className="w-full h-full min-h-screen flex flex-col items-center justify-center ">
    <h1 className="text-5xl text-error">home page</h1>
  </div>
);
}
