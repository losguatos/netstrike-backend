import { FastifyPluginAsync } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

type ModuleOptions = {
  prefix: string;
};

const etl: FastifyPluginAsync<ModuleOptions> = async function (fastify, opts) {
  console.log('opts.prefix', opts.prefix);
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {
      prefix: `${opts.prefix}`,
    },
  });
};

export default etl;
