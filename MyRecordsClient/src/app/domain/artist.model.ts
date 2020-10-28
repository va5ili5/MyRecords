import { Release } from './release.model';

export interface Artist {
  id: number;
  name: string;
  profile: string;
  releases: Release[] | null;
}
