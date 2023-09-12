import { dbPool } from '../db.js';
import { Guitar } from '../../core/models/index.js';
import { Metrics } from '../../core/metrics.js';
import { GuitarStore } from '../../core/stores/guitar.store.js';

const SELECT_ALL = `
SELECT * FROM guitars;
`;

const INSERT = `
INSERT INTO guitars (name, model, manufacturer, color)
VALUES ($1, $2, $3, $4);
`;

const SELECT_BY_NAME = `
SELECT * FROM guitars WHERE name = $1;
`;

export class GuitarPGStore implements GuitarStore {
  private readonly metrics: Metrics;

  constructor(metrics: Metrics) {
    this.metrics = metrics;
  }

  async all(): Promise<Guitar[]> {
    this.metrics.track();
    const result = await dbPool.query(SELECT_ALL);

    const guitars: Guitar[] = result.rows.map((g) => ({
      name: g.name,
      model: g.model,
      manufacturer: g.manufacturer,
      color: g.color,
    }));
    this.metrics.doStuff();
    return guitars;
  }

  async save(guitar: Guitar): Promise<Guitar> {
    await dbPool.query(INSERT, [
      guitar.name,
      guitar.model,
      guitar.manufacturer,
      guitar.color,
    ]);
    const result = await dbPool.query(SELECT_BY_NAME, [guitar.name]);
    const saved = result.rows[0];
    return {
      name: saved.name,
      model: saved.model,
      manufacturer: saved.manufacturer,
      color: saved.color,
    };
  }
}
