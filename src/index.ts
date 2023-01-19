import { sendMethod, setWebhook, WEBHOOK_ENDPOINT } from "./bot.ts";
import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";
await config({ export: true });

export const GROUP_CHAT_ID = Number(Deno.env.get("GROUP_CHAT_ID"));
export const PRIV_CHAT_ID = Number(Deno.env.get("PRIV_CHAT_ID"));

const app = new Application();

setWebhook().then(console.log);
sendMethod("setChatMenuButton", { menu_button: { type: "commands" } }).then(
  console.log,
);
sendMethod("setMyCommands", {
  commands: [{ command: "/create_event", description: "Create an event" }],
}).then(console.log);

app
  .post(WEBHOOK_ENDPOINT, async (c) => {
    const body = (await c.body) as any;
    console.log(body);

    const message = body?.message;
    const chat = message.chat;
    if (chat.type === "private") {
      if (message.text === "/create_event") {
        sendMethod("sendMessage", {
          chat_id: PRIV_CHAT_ID,
          text: "Send me the event details (name, description, date & time)",
        });
      } // hard-coded
      else if (message.text.startsWith("Event")) {
        const textToSend =
          `${message.text}\n\n---\nCreated by @${message.from.username}`;
        sendMethod("sendMessage", {
          chat_id: PRIV_CHAT_ID,
          text: textToSend,
        });
        sendMethod("sendMessage", {
          chat_id: GROUP_CHAT_ID,
          text: textToSend,
        });
      }
    }
  })
  .start({ port: 8080 });
