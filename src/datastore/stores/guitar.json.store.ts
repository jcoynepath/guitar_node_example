import fs from 'fs';
import path from 'path';
import url from 'url';
import { Guitar } from '../../core/models/index.js';
import { Metrics } from '../../core/metrics.js';
import { GuitarStore } from '../../core/stores/guitar.store.js';

const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

export class GuitarJSONStore implements GuitarStore {
  private readonly metrics: Metrics;

  constructor(metrics: Metrics) {
    this.metrics = metrics;
  }

  private getPath() {
    return path.resolve(DIRNAME, '../../..', 'json/guitars.json');
  }

  private getFile(): Guitar[] {
    const json = fs.readFileSync(this.getPath());
    return JSON.parse(json.toString());
  }

  private writeFile(json: Guitar[]): void {
    fs.writeFileSync(this.getPath(), JSON.stringify(json));
  }

  async all(): Promise<Guitar[]> {
    this.metrics.track();
    const results = this.getFile();

    const guitars: Guitar[] = results.map((g) => ({
      name: g.name,
      model: g.model,
      manufacturer: g.manufacturer,
      color: g.color,
    }));
    this.metrics.measure();
    return guitars;
  }

  async save(guitar: Guitar): Promise<Guitar> {
    const results = this.getFile();
    const index = results.findIndex((g) => g.name === guitar.name);
    if (index > -1) {
      results[index] = guitar;
    } else {
      results.push(guitar);
    }
    this.writeFile(results);
    return guitar;
  }
}
