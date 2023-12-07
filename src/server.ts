import Fastify from 'fastify';
import { guitars } from './api/index.js';
const fastify = Fastify({
  logger: true,
});

void fastify.register(async (crudApiContext) => {
  await crudApiContext.register(guitars);
});

try {
  void fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

export default fastify;
