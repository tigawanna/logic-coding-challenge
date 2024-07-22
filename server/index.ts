import app from './server';

const port = process.env.PORT || 3000;

const server = Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Listening on localhost:${server.port}`);
