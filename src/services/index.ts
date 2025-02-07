import { FastifyPluginAsync } from 'fastify';
import { exampleService } from './exampleService';

const services: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(exampleService);
};

export default services;
