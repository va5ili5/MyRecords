import { Country } from './country.model';
import { Format } from './format.model';
import { Label } from './label.model';
import { User } from './user.model';
import { Image } from './image.model';
import { Artist } from './artist.model';

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
}
