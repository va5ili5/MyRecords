import { Release } from './release.model';

export interface Format {
  id: number;
  name: string;
  releases: Release[];
}
