import Fastify from "fastify";
import app from "./app";
import closeWithGrace from "close-with-grace";
import { Value } from "@sinclair/typebox/value";
import { envSchema } from "./plugins/config";

if (!Value.Check(envSchema, process.env)) {
  throw new Error(JSON.stringify([...Value.Errors(envSchema, process.env)]));
}
const fastify = Fastify({
  logger: {
    level: "info",
    redact: [
      "headers.authorization",
      "token",
      "jwt",
      "key",
      "api_key",
      "apiKey",
      "password",
      "secret",
      "api_secret",
      "apiSecret",
      "card_number",
      "cardNumber",
      "credit_card",
      "creditCard",
      "credit_card_number",
      "creditCardNumber",
    ],
  },
});

// Register the app
fastify.register(app);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({ err }) {
  if (err) {
    fastify.log.error(err);
  }
  await fastify.close();
});

fastify.addHook("onClose", closeListeners.uninstall);

fastify.listen(
  {
    port: parseInt(process.env.FASTIFY_PORT),
    host: process.env.FASTIFY_ADDRESS,
  },
  (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  },
);
