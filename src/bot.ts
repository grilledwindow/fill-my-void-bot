import { config } from "https://deno.land/x/dotenv/mod.ts";
await config({ export: true });

export const API_URL = `https://api.telegram.org/bot${
  Deno.env.get("API_KEY")
}/`;
export const WEBHOOK_ENDPOINT = "/hook";

export const setWebhook = (): Promise<unknown> => {
  const body = {
    url: Deno.env.get("BASE_URL") + WEBHOOK_ENDPOINT,
    drop_pending_updates: "true",
  };
  return sendMethod("setWebhook", body);
};

export const sendMethod = (
  method: string,
  body: Record<string, unknown>,
): Promise<unknown> =>
  fetch(API_URL + method, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
