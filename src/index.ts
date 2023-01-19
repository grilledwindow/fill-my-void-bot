import { sendMethod, setWebhook, WEBHOOK_ENDPOINT } from "./bot/index.ts";
import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";
await config({ export: true });

const GROUP_CHAT_ID = Number(Deno.env.get("GROUP_CHAT_ID"));
const PRIV_CHAT_ID = Number(Deno.env.get("PRIV_CHAT_ID"));

const app = new Application();

setWebhook().then(console.log);

app
  .post(WEBHOOK_ENDPOINT, async (c) => {
    const body = await c.body;
    console.log(body);
  })
  .start({ port: 8080 });
