import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Exception } from "../../../types/Exception";

const example: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.get("/", {}, async function (request, reply) {
    try {
      return {
        isThisExampleRoute: true,
        exampleService: fastify.exampleService.exampleServiceFunction(),
      };
    } catch (err: unknown) {
      const error = err as Exception;
      const errorCode = error.code || 500;
      request.log.error({ err, errorCode }, "Error in route");
    }
  });
};
export default example;
