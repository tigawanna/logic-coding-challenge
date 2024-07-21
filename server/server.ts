import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' });
});

app.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();

    const response = await fetch(
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

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.error('Error during login:', error);
    return c.json({ error: 'Failed to login. Please try again later.' }, 500);
  }
});

export default app;
