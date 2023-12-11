import { GuitarStore } from './core/stores/guitar.store.js';
import { GuitarPGStore } from './datastore/stores/guitar.pg.store.js';
import { GuitarJSONStore } from './datastore/stores/guitar.json.store.js';
import { Metrics } from './core/metrics.js';
import { MetricsConsole } from './metrics/metrics.console.js';

export const metrics: Metrics = new MetricsConsole();
// export const guitarStore: GuitarStore = new GuitarPGStore(metrics);
export const guitarStore: GuitarStore = new GuitarJSONStore(metrics);
