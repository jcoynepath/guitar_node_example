import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { Color } from '../types.js';
import { guitarStore } from '../components.js';
import { GuitarSchema } from './schema.js';

export const guitars = async (
  server: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  server.get('/', async (_request, reply) => {
    const guitars = await guitarStore.all();
    return reply.send({ guitars });
  });

  server.post<{ Body: FromSchema<typeof GuitarSchema> }>(
    '/',
    {
      schema: {
        body: GuitarSchema,
      },
    },
    async (request, reply) => {
      const data = request.body;
      const saved = await guitarStore.save({
        name: data.name,
        model: data.model,
        manufacturer: data.manufacturer,
        color: data.color as Color,
      });
      reply.send({ guitar: saved });
    },
  );
};
