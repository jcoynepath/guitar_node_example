import { Guitar } from '../models/index.js';

export interface GuitarStore {
  all(): Promise<Guitar[]>;
  save(guitar: Guitar): Promise<Guitar>;
}
