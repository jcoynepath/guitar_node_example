import { GuitarStore } from './core/stores/guitar.store.js';
import { GuitarPGStore } from './db/stores/guitar.pg.store.js';
import { Metrics } from './core/metrics.js';
import { MetricsConsole } from './metrics/metrics.console.js';

export const metrics: Metrics = new MetricsConsole();
export const guitarStore: GuitarStore = new GuitarPGStore(metrics);