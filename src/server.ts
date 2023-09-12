import Fastify from 'fastify';
import { guitars } from './api/index.js';
const fastify = Fastify({
  logger: true,
});

await fastify.register(async (crudApiContext) => {
  await crudApiContext.register(guitars);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
