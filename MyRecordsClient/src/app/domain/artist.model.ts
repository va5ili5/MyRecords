import { Base } from './base.model';
import { Release } from './release.model';

export interface Artist extends Base{
  name: string;
  profile: string;
  releases: Release[] | null;
}
