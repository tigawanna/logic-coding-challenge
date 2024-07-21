import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'x-tenantid'],
  })
);

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.post('/login', async (c) => {
  const { username, password } = await c.req.json();
  console.log(
    ' ============= hono js ====================== ',
    username,
    password
  );
  if (username && username === '') {
    return c.json({ message: 'username required' });
  }
  if (password && password === '') {
    return c.json({ message: 'password required' });
  }
  const res = await fetch(
    ' https://7qscqm2xvu2.us-west-2.awsapprunner.com/v1/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenantid': 'SchryverPruebas',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  if (!res.ok) {
    return c.json({ message: `Auth Error: ${res.status}` });
  }

  const data = await res.json();
  c.res.headers.append('Content-Type', 'application/json');
  return c.json({ message: 'login success', data }, 200);
});

export default app;
