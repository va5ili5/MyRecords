import { Country } from "../domain/country.model";
import { Format } from "../domain/format.model";
import { Genre } from "../domain/genre.model";

export interface FormsDataDto {
    countries: Country[];
    formats: Format[];
    genres: Genre[];
}