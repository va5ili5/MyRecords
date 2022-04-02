import { Artist } from "./artist.model";
import { Release } from "./release.model";

export interface Song {
    position: number;
    title: string;
    length: string;
    release?: null | Release;

}