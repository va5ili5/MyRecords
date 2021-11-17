import { Style } from "./style.model";

export interface Genre {
    id: number;
    name: string;
    styles: Style[];
  }