 
import fp from 'fastify-plugin';

declare module 'fastify' {
  export interface FastifyInstance {
    exampleService: {
      exampleServiceFunction: () => string;
    };
  }
}

export const exampleService = fp(async function (fastify) {
  fastify.decorate('exampleService', {
    exampleServiceFunction: () => {
      return 'exampleServiceFunction response';
    },
  });
});
