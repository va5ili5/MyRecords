import { Release } from './release.model';

export interface Country {
  id: number;
  name: string;
  iso: string;
  releases: Release[] | null;
}
