import { Base } from './base.model';
import { Release } from './release.model';

export interface Country extends Base {
  name: string;
  iso: string;
  releases: Release[] | null;
}
