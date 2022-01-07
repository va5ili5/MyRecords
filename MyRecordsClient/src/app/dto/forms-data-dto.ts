import { Artist } from "../domain/artist.model";
import { Country } from "../domain/country.model";
import { Format } from "../domain/format.model";
import { Genre } from "../domain/genre.model";
import { Label } from "../domain/label.model";

export interface FormsDataDto {
    artists: Artist[];
    labels: Label[];
    countries: Country[];
    formats: Format[];
    genres: Genre[];
}