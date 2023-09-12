export const OBJECT = 'object';
export const STRING = 'string';

export const GuitarSchema = {
  type: OBJECT,
  properties: {
    name: { type: STRING },
    model: { type: STRING },
    manufacturer: { type: STRING },
    color: { type: STRING, pattern: '^(red|blue|green|sunburst)$' },
  },
  required: ['name', 'model', 'manufacturer', 'color'],
} as const;
