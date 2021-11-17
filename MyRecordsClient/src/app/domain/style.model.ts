import { Genre } from "./genre.model";

export interface Style {
    id: number;
    name: string;
    genre: Genre;
  }