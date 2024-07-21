import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'jsonwebtoken';

const app = new Hono();

const JWT_SECRET = 'your-secret-key';

app.use(
  '*',
  cors({
    origin: 'http://localhost:5173',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'x-tenantid'],
  })
);

app.post('/login', async (c) => {
  const { username, password } = await c.req.json();

  if (!username || username.trim() === '') {
    return c.json({ message: 'Username required' }, 400);
  }
  if (!password || password.trim() === '') {
    return c.json({ message: 'Password required' }, 400);
  }

  try {
    const res = await fetch(
      'https://7qscqm2xvu2.us-west-2.awsapprunner.com/v1/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-tenantid': 'SchryverPruebas',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!res.ok) {
      return c.json({ message: `Auth Error: ${res.status}` });
    }

    const data = await res.json();
    const token = data.token;

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET); // Verify and decode token
    } catch (err) {
      return c.json({ message: 'Invalid token' }, 401);
    }

    return c.json({ message: 'Login success', user: decodedToken }, 200);
  } catch (error) {
    console.log(error.message);
    return c.json({ message: 'Internal Server Error' }, 500);
  }
});

export default app;
