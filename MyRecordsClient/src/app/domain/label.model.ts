import { Release } from "./release.model";

export interface Label {
  id: number;
  name: string;
  profile: string;
  releases: Release[] | null;
}
