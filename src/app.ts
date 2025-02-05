import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import config, { envSchema } from "./plugins/config";
import { Static } from "@fastify/type-provider-typebox";

export type AppOptions = {
  metrics?: boolean;
} & Partial<AutoloadPluginOptions> &
  Partial<Static<typeof envSchema>>;

const options: AppOptions = {
  metrics: false,
};

const app: FastifyPluginAsync<AppOptions> = fp(
  async (fastify: FastifyInstance, opts: AppOptions): Promise<void> => {
    await fastify.register(config, Object.assign(options, opts));

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    void fastify.register(AutoLoad, {
      dir: join(__dirname, "plugins"),
      ignoreFilter: (path) =>
        path.endsWith("config.js") || path.endsWith("config.ts"),
      options: Object.assign(options, opts),
    });

    // This loads all services defined in services
    // define your service files there
    void fastify.register(AutoLoad, {
      dir: join(__dirname, "services"),
      encapsulate: false,
      options: Object.assign(options, opts),
    });

    // This loads all plugins defined in modules
    // define your modules and routes in one of these
    void fastify.register(AutoLoad, {
      dir: join(__dirname, "modules"),
      encapsulate: false,
      maxDepth: 1,
      options: Object.assign(options, opts),
    });
  },
);

export default app;
export { app, options };
