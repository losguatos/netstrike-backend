import { fastifyEnv, FastifyEnvOptions } from "@fastify/env";
import fp from "fastify-plugin";
import { Static, Type } from "@fastify/type-provider-typebox";

// Add environment variables here to validate they are available on app startup
export const envSchema = Type.Object({
  FASTIFY_ADDRESS: Type.String({ default: "0.0.0.0" }),
  FASTIFY_PORT: Type.String({ default: "4000" }),
  ENVIRONMENT_NAME: Type.Union([Type.Literal("dev"), Type.Literal("prod")], {
    default: "dev",
  }),
});

type Schema = Static<typeof envSchema>;

// Use TypeScript module augmentation to declare the type of fastify.config to be type Schema
declare module "fastify" {
  interface FastifyInstance {
    config: Schema;
  }
}

export default fp(async (fastify, opts) => {
  const data = Object.assign(process.env, opts);
  const options: FastifyEnvOptions = {
    confKey: "config", // optional, default: 'config'
    schema: envSchema,
    dotenv: true,
    data: data,
  };

  fastify.register(fastifyEnv, options);
});
