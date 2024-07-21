import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/")({
  component: HomePage,
});



export function HomePage(){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
home page
 </div>
);
}
