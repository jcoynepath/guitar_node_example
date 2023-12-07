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

const UPDATE = `
UPDATE guitars SET model = $2, manufacturer = $3, color = $4 WHERE name = $1`;

const FIND_BY_NAME = `SELECT * FROM guitars WHERE name = $1`;

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
    this.metrics.measure();
    return guitars;
  }

  async save(guitar: Guitar): Promise<Guitar> {
    const found = await dbPool.query(FIND_BY_NAME, [guitar.name]);
    const data = [guitar.name, guitar.model, guitar.manufacturer, guitar.color];
    if (found.rows.length) {
      await dbPool.query(UPDATE, data).then((result) => result.rows[0]);
    } else {
      await dbPool.query(INSERT, data).then((result) => result.rows[0]);
    }
    return guitar;
  }
}
