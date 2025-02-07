import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  const status = 'ok';

  fastify.get('/ready', {}, async function () {
    return status;
  });
});
