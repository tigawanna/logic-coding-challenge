import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");
app.get("/", (c) => c.text("Hello World"));

app.post("/", async (c) => {
  const { username, password } = await c.req.parseBody<{ username: string; password: string }>();
  console.log(" ============= hono js ====================== ", username, password);
  if (username && username === "") {
    return c.json({ message: "username required" });
  }
  if (password && password === "") {
    return c.json({ message: "password required" });
  }
  // change to your endpoint
  const res = await fetch("https://7qk9m2xvu2.us-west-2.awsapprunner.com/v1/auth/login", {
    method: "POST",
    headers: {
      // change to your headers
      "Content-Type": "application/json",
      "x-tenentid": "Schryver Pruebas",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!res.ok) {
    return c.json({ message: `Auth Error: ${res.status}` });
  }

  const data = await res.json();
  c.res.headers.append("Content-Type", "application/json");
  return c.json({ message: "login success", data }, 200);
});

export default handle(app);
