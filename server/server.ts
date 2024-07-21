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
  try {
    const { username, password } = await c.req.json();

    if (!username || username.trim() === '') {
      return c.json({ message: 'Username required' }, 400);
    }
    if (!password || password.trim() === '') {
      return c.json({ message: 'Password required' }, 400);
    }

    const res = await fetch(
      'https://7qscqm2xvu2.us-west-2.awsapprunner.com/v1/auth/login',
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
    return c.json({ message: 'Login success', data }, 200);
  } catch (error) {
    console.error('Error in /login route:', error);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

export default app;
