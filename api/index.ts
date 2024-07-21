import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");
app.get("/", (c) => c.text("Hello World"));

app.post("/", async (c) => {
  const body = await c.req.json<{ username: string; password: string }>();
  const { username, password } = body;

  if (!body) {
    return c.json({ status: 401, message: "The request payload is required" }, 401);
  }

  if (username && username === "") {
    return c.json({ message: "username required" });
  }
  if (password && password === "") {
    return c.json({ message: "password required" });
  }

  const res = await fetch("https://7qk9m2xvu2.us-west-2.awsapprunner.com/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenantid": "SchryverPruebas",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!res.ok) {
    return c.json({ message: `Auth Error: ${res.status}` }, 401);
  }

  const data = await res.json();
  c.res.headers.append("Content-Type", "application/json");
  return c.json({ message: "login success", data }, 200);
});

export default handle(app);
