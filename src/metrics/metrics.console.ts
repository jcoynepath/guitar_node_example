import { Metrics } from '../core/metrics.js';

export class MetricsConsole implements Metrics {
  track() {
    console.log('tracking stuff');
  }

  doStuff() {
    console.log('doing stuff');
  }
}
