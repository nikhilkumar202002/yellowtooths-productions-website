import axios from "axios";

export const API_BASE_URL = "https://yt.jinskadamthodu.com/public/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

export type FilmPosterImage = {
  id: number;
  film_poster_design_id: number;
  file_path: string;
  position: number;
};

export type FilmPosterDesign = {
  id: number;
  film_name: string;
  year: string | null;
  language: string | null;
  genre: string | null;
  imdb_rating: string | null;
  trailer_link: string | null;
  main_image: string | null;
  description: string | null;
  position_number: number | null;
  type: string | null;
  updated_by: number | null;
  wikipedia_link: string | null;
  imdb_link: string | null;
  behance_link: string | null;
  is_approved: number;
  approved_by: number | null;
  images: FilmPosterImage[];
};

export async function getAllFilmPosterDesigns() {
  const response = await api.get<FilmPosterDesign[]>(
    "/film-poster-designs/all",
  );

  return response.data;
}

export default api;
