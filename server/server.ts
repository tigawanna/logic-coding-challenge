import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono with Bun!' });
});

app.get('/data', (c) => {
  return c.json({ data: 'Here is some data' });
});

export default app;
