import { Country } from './country.model';
import { Format } from './format.model';
import { Label } from './label.model';
import { User } from './user.model';
import { Image } from './image.model';
import { Artist } from './artist.model';
import { Song } from './song.model';
import { Genre } from './genre.model';
import { Style } from './style.model';

export interface Release {
  id: number;
  title: string;
  formatDetails: string;
  catno: string;
  releaseDate: Date;
  createDate: Date;
  user: User;
  country: Country;
  label: Label;
  format: Format;
  images: Image[] | null;
  artists: Artist[];
  songs: Song[];
  genres: Genre[];
  styles: Style[];
}
